<script lang="ts">
	import type { Contract } from "$lib/services";
	import { contractDeactModalOpen, contractEditModalOpen, selectedContract } from "$lib/stores";

	export let contract: Contract;
	export let dropdownOpen = false;

	let dropdownElem: HTMLButtonElement;

	interface DropdownAction {
		name: string;
		icon: string;
		red?: boolean;
		handler: Function;
	}

	const assetPath = "/assets/dropdown/";

	const ddActions: DropdownAction[] = [
		{
			name: "Edit",
			icon: assetPath + "edit.svg",
			handler: () => openEditModal()
		},
		{
			name: "Deactivate",
			icon: assetPath + "trash.svg",
			red: true,
			handler: () => openDeactivateModal()
		}
	];

	const toggleDropdown = () => {
		if (dropdownOpen) {
			dropdownElem.blur();
			dropdownOpen = false;
		} else {
			dropdownOpen = true;
		}
	};

	const openEditModal = () => {
		$selectedContract = contract;
		$contractEditModalOpen = true;
	};

	const openDeactivateModal = () => {
		$selectedContract = contract;
		$contractDeactModalOpen = true;
	}

	const handleAndClose = async (handler: Function) => {
		await handler();

		const btn = document.activeElement as HTMLButtonElement;
		btn.blur();
	};
</script>

<div class="dropdown dropdown-bottom dropdown-end overflow-visible">
	<button on:click={toggleDropdown} on:blur={toggleDropdown} bind:this={dropdownElem} tabindex="0" class="flex items-center">
		<img src="/assets/ellipsis.svg" alt="..." width="18px" height="4px" class="inline m-2" />
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu">
		{#each ddActions as action}
			<li>
				<button on:click={() => handleAndClose(action.handler)}>
					<img src={action.icon} alt={action.name} class="inline" />
					<span class="text-sm whitespace-nowrap mr-9" class:text-warning={action.red}>{action.name}</span>
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.dropdown-content {
		border: 1px solid #e6e4df;
		border-radius: 4px;
		background-color: #faf9f9;
	}
</style>
