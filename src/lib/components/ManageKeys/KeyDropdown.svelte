<script lang='ts'>
	import { keyService } from "$lib/services";
	import { apiKeyList, editKey } from "$lib/stores";
	import { copyText } from "$lib/utils";
	import type { ApiKey } from "$lib/types";

	export let key: ApiKey;
	export let keyIdx: number;
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
			name: "Copy Key",
			icon: assetPath + "copy.svg",
			handler: () => copyText(key.data)
		},
		{
			name: "Edit",
			icon: assetPath + "edit.svg",
			handler: () => setEdit()
		},
		{
			name: "Deactivate",
			icon: assetPath + "trash.svg",
			red: true,
			handler: () => deactivateKey()
		}
	]

	const toggleDropdown = () => {
		if (dropdownOpen) {
			dropdownElem.blur();
			dropdownOpen = false;
		} else {
			dropdownOpen = true;
		}
	}

	const setEdit = () => {
		$editKey = key;
	}

	const deactivateKey = async () => {
		try {
			const deactivatedKey = await keyService.deactivateApiKey(key.id);
			$apiKeyList[keyIdx] = deactivatedKey;
		} catch (e) {
			console.error(e);
		}
	}

	const handleAndClose = async (handler: Function) => {
		await handler();

		const btn = document.activeElement as HTMLButtonElement
		btn.blur();
	}

</script>

<div class="dropdown dropdown-bottom dropdown-end overflow-visible">
	<button
		on:click={toggleDropdown}
		on:blur={toggleDropdown}
		bind:this={dropdownElem}
		tabindex="0"
		class="flex items-center"
	>
		<img src="/assets/ellipsis.svg" alt="..." width="18px" height="4px" class="inline m-2" />
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu">
		{#each ddActions as action}
			<li>
				<button on:click={() => handleAndClose(action.handler)}>
					<img src={action.icon} alt={action.name} class="mr-2 inline" />
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
		background-color: #FAF9F9;
	}
</style>

