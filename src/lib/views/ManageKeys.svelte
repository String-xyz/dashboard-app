<script lang="ts">
	import { onMount } from "svelte";
	import { NavItem } from "$lib/constants";
	import { keyService, platformService } from "$lib/services";
	import { apiKeyList, platformList, keyCreateModalOpen, toast } from "$lib/stores";

	import KeyTable from "$lib/components/ManageKeys/KeyTable.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import Toast from "$lib/components/Toast.svelte";

	const createApiKey = async () => {
		if ($platformList.length === 0) {
			$toast.show("error", "You must create a game first");
			return;
		}

		$keyCreateModalOpen = !$keyCreateModalOpen;
	}

	onMount(async () => {
		try {
			$apiKeyList = await keyService.listApiKeys();
			$platformList = await platformService.listPlatforms();
		} catch (e) {
			console.error(e);
			$toast.show("error", "Error fetching API Keys");
		}
	});
</script>

<svelte:head>
	<title>{NavItem.MANAGE_KEYS} | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="header flex justify-between items-center">
			<h3 class="text-2xl font-bold">{NavItem.MANAGE_KEYS}</h3>
			<StyledButton className="btn-outline" action={createApiKey}>
				<img src="/assets/button/plus.svg" alt="+" class="inline mr-3" />
				Create a Key
			</StyledButton>
		</div>
	</header>
	<div class="divider mt-4 mb-12" />

	<KeyTable />

	<Toast type={$toast.type} size="sm" bind:display={$toast._display}>{$toast.message}</Toast>
</div>

<style>
	.main {
		padding: 70px;
		overflow: none;
	}

	@media (max-width: 800px) {
		.header {
			flex-direction: column;
			row-gap: 20px;
		}
	}
</style>
