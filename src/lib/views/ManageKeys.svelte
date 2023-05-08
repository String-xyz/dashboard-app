<script lang="ts">
	import { onMount } from "svelte";
	import KeyTable from "$lib/components/ManageKeys/KeyTable.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import Toast from "$lib/components/Toast.svelte";

	import { keyService } from "$lib/services";
	import { apiKeyList, createdApiKey, keySuccessModalOpen, toast } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common";

	const createApiKey = async () => {
		if ($keySuccessModalOpen) {
			$keySuccessModalOpen = false;
			return;
		}

		try {
			const newApiKey = await keyService.createApiKey();
			$createdApiKey = newApiKey;
			$keySuccessModalOpen = true;

			$apiKeyList = await keyService.listApiKeys();
		} catch (e: any) {
			return commonErrorHandler(e, "API Key");
		}
	};

	onMount(async () => {
		try {
			$apiKeyList = await keyService.listApiKeys();
		} catch (e) {
			console.error(e);
			$toast.show("error", "Error fetching API Keys");
		}
	});
</script>

<svelte:head>
	<title>Manage API Keys | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="header flex justify-between items-center">
			<h3 class="text-2xl font-bold">Manage API Keys</h3>
			<StyledButton className="btn-outline" action={createApiKey}>
				<img src={"/assets/button/plus.svg"} alt="+" class="inline mr-3" />
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
