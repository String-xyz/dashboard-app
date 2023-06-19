<script lang="ts">
	import { authService, keyService } from "$lib/services";
	import { apiKeyList, selectedKey, currentUser, toast } from "$lib/stores";
	import { copyText } from "$lib/utils";
	import { commonErrorHandler, type ApiKey, Role } from "$lib/common";

	export let key: ApiKey;
	export let dropdownOpen = false;

	let dropdownElem: HTMLButtonElement;

	interface DropdownAction {
		name: string;
		icon: string;
		keyType?: string;
		red?: boolean;
		minPerms?: Role;
		handler: Function;
	}

	const assetPath = "/assets/dropdown/";

	const ddActions: DropdownAction[] = [
		{
			name: "Copy Key",
			icon: assetPath + "copy.svg",
			keyType: "public",
			handler: () => {
				copyText(key.data);
				$toast.show("success", "Key copied to clipboard");
			}
		},
		{
			name: "Edit",
			icon: assetPath + "edit.svg",
			handler: () => setEdit()
		},
		{
			name: "Delete",
			icon: assetPath + "trash.svg",
			red: true,
			minPerms: Role.ADMIN,
			handler: () => deleteKey()
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

	const setEdit = () => {
		$selectedKey = key;
	};

	const deleteKey = async () => {
		try {
			if (!authService.canView($currentUser.role, Role.ADMIN)) {
				$toast.show("error", "You do not have permission to delete this key");
				return;
			}

			await keyService.deleteApiKey(key.id);
			$apiKeyList = await keyService.listApiKeys();

			$toast.show("success", "Key deleted");
		} catch (e: any) {
			return commonErrorHandler(e, "API key");
		}
	};

	const handleAndClose = async (handler: Function) => {
		await handler();

		const btn = document.activeElement as HTMLButtonElement;
		btn.blur();
	};

	const getKeyActions = () => {
		let filteredActions = ddActions.filter(a => a.keyType === key.type || a.keyType === undefined);
		filteredActions = filteredActions.filter(a => authService.canView($currentUser.role, a.minPerms ?? Role.MEMBER));

		return filteredActions;
	}

</script>

<div class="dropdown dropdown-bottom dropdown-end overflow-visible">
	<button on:click={toggleDropdown} on:blur={toggleDropdown} bind:this={dropdownElem} tabindex="0" class="flex items-center">
		<img src="/assets/ellipsis.svg" alt="..." width="18px" height="4px" class="inline m-2" />
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu">
		{#each getKeyActions() as action}
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
