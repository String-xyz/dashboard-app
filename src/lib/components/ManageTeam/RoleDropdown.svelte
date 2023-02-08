<script lang="ts">
	import { Role, rolesList, currentUser, type User } from "$lib/stores";

	export let member: User;

	let dropdownElem: HTMLButtonElement;
	let dropdownOpen = false;

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

	const setMemberRole = (toRole: Role) => {
		member.role = toRole
	}

	const openDeactivateModal = () => {

	}

</script>

<div class="dropdown dropdown-bottom dropdown-end">
	<button 
		on:click={toggleDropdown}
		on:blur={() => dropdownOpen = false}
		bind:this={dropdownElem}
		tabindex="0"
		class="font-bold tracking-wider text-sm"
	>
		{member.role}
		<img src="/assets/button/dropdown_arrow.svg" alt="dropdown" width="12px" height="12px" class="ml-2 inline" />	
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu w-60">
		{#each rolesList.filter(r => r != Role.OWNER || $currentUser.role == Role.OWNER) as role}
			{@const active = member.role == role}
			<li class:active={active}>
				<button on:click={() => {setMemberRole(role)}} class="font-bold text-xs tracking-wider uppercase">
					<img src={ active ? radioActive[0] : radioInactive[0] } alt={ active ? radioActive[1] : radioInactive[1] }/>
					<p class="my-1">{role}</p>
				</button>
			</li>
		{/each}
		<li>
			<button on:click={openDeactivateModal} class="text-sm text-[#F56161]">
				{member.isInvite ? "Revoke invite" : "Remove member"}
			</button>
		</li>
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