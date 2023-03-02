<script lang="ts">
	import { Role, type TeamItem } from "$lib/types";
	import { apiClient } from "$lib/services";
	import { rolesList, currentUser, deactModalOpen, deactUser, transferOwnerModalOpen, ownershipTransferee, teamItems } from "$lib/stores";
	import { onMount } from "svelte";

	export let member: TeamItem | null = null;
	export let activeRole: Role = Role.MEMBER;
	export let isForInvite = false;
	export let dropdownOpen = false;

	onMount(() => {
		activeRole = member?.role ?? activeRole;
	});

	let dropdownElem: HTMLButtonElement;

	const assetPath = "/assets/dropdown/"

	// [src, alt text]
	const radioActive = [assetPath + "radio_checked.svg", "radio-checked"]
	const radioInactive = [assetPath + "radio_inactive.svg", "radio-inactive"]

	const toggleDropdown = () => {
		if (dropdownOpen) {
			dropdownElem.blur();
			dropdownOpen = false;
		} else {
			dropdownOpen = true;
		}
	}

	const setMemberRole = async (toRole: Role) => {
		const prevActiveRole = activeRole;

		const btn = document.activeElement as HTMLButtonElement
		btn.blur();
		
		if (!member) return;
		
		try {
			if (toRole === Role.OWNER) {
				$ownershipTransferee = member;
				$transferOwnerModalOpen = true;
				return;
			}

			if (isForInvite) {
				await apiClient.changeInviteRole(member.id, toRole);
			} else {
				await apiClient.changeMemberRole(member.id, toRole);
			}

			activeRole = toRole;

			member.role = toRole;

			// const memberIdx = $teamItems.findIndex((t) => t.id === member?.id);
			
			// if (memberIdx > 0) {
			// 	$teamItems[memberIdx] = member;
			// }

		} catch (error) {
			activeRole = prevActiveRole;
			// TODO: Show error notification
			console.log(error);
		}
		
	}

	const getFilteredRoles = () => {
		return rolesList.filter(r => {
			if (r === Role.OWNER) {
				return $currentUser.role === Role.OWNER && !isForInvite;
			} else {
				return true;
			}
		});
	}

	const openDeactivateModal = () => {
		if (!member) return;

		$deactUser = member;
		$deactModalOpen = true;

	}

</script>

<div class="dropdown dropdown-bottom dropdown-end">
	<button 
		on:click={toggleDropdown}
		on:blur={toggleDropdown}
		bind:this={dropdownElem}
		tabindex="0"
		class="font-bold tracking-wider text-sm"
	>
		{activeRole}
		<img src="/assets/button/dropdown_arrow.svg" alt="dropdown" width="12px" height="12px" class="ml-2 inline" />	
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu w-60">
		{#key activeRole}
			{#each getFilteredRoles() as role}
				{@const active = role === activeRole}
				<li class:active={active}>
					<button on:click={() => setMemberRole(role)} class="font-bold text-xs tracking-wider uppercase">
						<img src={ active ? radioActive[0] : radioInactive[0] } alt={ active ? radioActive[1] : radioInactive[1] }/>
						<p class="my-1">{role}</p>
					</button>
				</li>
			{/each}
			{#if member}
				<li>
					<button on:click={openDeactivateModal} class="text-warning text-sm">
						{member?.isInvite ? "Revoke invite" : "Remove member"}
					</button>
				</li>
			{/if}
		{/key}
	</ul>
</div>

<style>
	.active {
		background-color: #DFF1FF; 
	}

	.dropdown-content {
		border: 1px solid #e6e4df;
		border-radius: 4px;
		background-color: #faf9f9;
	}

</style>