<script lang="ts">
	import { Role, type TeamItem } from "$lib/types";
	import { apiClient } from "$lib/services";
	import { rolesList, currentUser, deactModalOpen, deactUser } from "$lib/stores";

	export let member: TeamItem | null = null;
	export let isInvite = member?.isInvite ?? false;
	export let inviteRole: Role = Role.MEMBER;
	export let dropdownOpen = false;

	let dropdownElem: HTMLButtonElement;

	const assetPath = "/assets/dropdown/"

	//src, alt text
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
		if (isInvite) {
			inviteRole = toRole;
		}

		const btn = document.activeElement as HTMLButtonElement
		btn.blur();
		
		if (!member) return;
		
		try {
			let res;
			if (member.isInvite) res = await apiClient.changeInviteRole(member.id, toRole);
			else res = await apiClient.changeMemberRole(member.id, toRole);
			
			member.role = toRole;
		} catch (error) {
			// TODO: Show error notification
			console.log(error);
		}
		
	}

	const openDeactivateModal = () => {
		if (!member) return;

		$deactUser = member;
		$deactModalOpen = !$deactModalOpen

	}

</script>

<div class="dropdown dropdown-bottom dropdown-end overflow-visible">
	<button 
		on:click={toggleDropdown}
		on:blur={toggleDropdown}
		bind:this={dropdownElem}
		tabindex="0"
		class="font-bold tracking-wider text-sm "
	>
		{isInvite ? inviteRole: (member?.role ?? Role.MEMBER)}
		<img src="/assets/button/dropdown_arrow.svg" alt="dropdown" width="12px" height="12px" class="ml-2 inline" />	
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu w-60">
		{#each rolesList.filter(r => r != Role.OWNER || $currentUser.role == Role.OWNER) as role}
			{@const active = isInvite ? inviteRole == role : (member?.role ?? Role.MEMBER) == role}
			<li class:active={active}>
				<button on:click={() => setMemberRole(role)} class="font-bold text-xs tracking-wider uppercase">
					<img src={ active ? radioActive[0] : radioInactive[0] } alt={ active ? radioActive[1] : radioInactive[1] }/>
					<p class="my-1">{role}</p>
				</button>
			</li>
		{/each}
		{#if !isInvite}
			<li>
				<button on:click={openDeactivateModal} class="text-warning text-sm">
					{member?.isInvite ? "Revoke invite" : "Remove member"}
				</button>
			</li>
		{/if}
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