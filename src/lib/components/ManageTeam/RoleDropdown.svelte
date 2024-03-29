<script lang="ts">
	import { onMount } from "svelte";
	import { apiClient } from "$lib/services";
	import { Role, commonErrorHandler, type TeamItem } from "$lib/common";
	import { currentUser, deactModalOpen, deactUser,
		transferOwnerModalOpen, ownershipTransferee, memberList, toast } from "$lib/stores";

	export let member: TeamItem | null = null;
	export let activeRole: Role = Role.MEMBER;
	export let isForInvite = false;
	export let dropdownOpen = false;

	onMount(() => {
		activeRole = member?.role ?? activeRole;
	});

	let dropdownElem: HTMLButtonElement;

	const assetPath = "/assets/dropdown/";

	// [src, alt text]
	const radioActive = [assetPath + "radio_checked.svg", "radio-checked"];
	const radioInactive = [assetPath + "radio_inactive.svg", "radio-inactive"];

	const toggleDropdown = () => {
		if (dropdownOpen) {
			dropdownElem.blur();
			dropdownOpen = false;
		} else {
			dropdownOpen = true;
		}
	};

	const setMemberRole = async (toRole: Role) => {
		const prevActiveRole = activeRole;
		activeRole = toRole;

		const btn = document.activeElement as HTMLButtonElement;
		btn.blur();

		if (!member) return;

		try {
			if (toRole === Role.OWNER) {
				activeRole = prevActiveRole;
				$ownershipTransferee = member;
				$transferOwnerModalOpen = true;
				return;
			}

			if (isForInvite) {
				await apiClient.changeInviteRole(member.id, toRole);
				$toast.show("success", "Invite role updated!");
			} else {
				await apiClient.changeMemberRole(member.id, toRole);
				$toast.show("success", "Member role updated!");
			}

			const memberIdx = $memberList.findIndex((t) => t.id === member?.id);

			if (memberIdx > 0) {
				$memberList[memberIdx].role = activeRole;
			}
		} catch (e: any) {
			activeRole = prevActiveRole;

			return commonErrorHandler(e, "member");
		}
	};

	const getFilteredRoles = () => {
		return Object.values(Role).filter((r) => {
			if (r === Role.OWNER) {
				return $currentUser.role === Role.OWNER && !isForInvite;
			} else {
				return true;
			}
		});
	};

	const openDeactivateModal = () => {
		if (!member) return;

		$deactUser = member;
		$deactModalOpen = true;
	};
</script>

<div class="dropdown dropdown-bottom dropdown-end">
	<button on:click={toggleDropdown} on:blur={toggleDropdown} bind:this={dropdownElem} tabindex="0" class="font-bold tracking-wider text-sm">
		{activeRole}
		<img src="/assets/button/dropdown_arrow.svg" alt="dropdown" width="12px" height="12px" class="ml-2 inline" />
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu w-60">
		{#key activeRole}
			{#each getFilteredRoles() as role}
				{@const active = role === activeRole}
				<li class:active>
					<button on:click={() => setMemberRole(role)} class="font-bold text-xs tracking-wider uppercase">
						<img src={active ? radioActive[0] : radioInactive[0]} alt={active ? radioActive[1] : radioInactive[1]} />
						<p class="my-1">{role}</p>
					</button>
				</li>
			{/each}
			{#if member}
				<li>
					<button on:click={openDeactivateModal} class="text-warning text-sm">
						{member?.isInvite ? "Revoke invite" : "Deactivate member"}
					</button>
				</li>
			{/if}
		{/key}
	</ul>
</div>

<style>
	.active {
		background-color: #dff1ff;
	}

	.dropdown-content {
		border: 1px solid #e6e4df;
		border-radius: 4px;
		background-color: #faf9f9;
	}
</style>
