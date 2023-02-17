<script lang="ts">
	import KeyTable from '$lib/components/ManageKeys/KeyTable.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import { keyService } from '$lib/services';

	import { apiKeyList, createdApiKey, keySuccessModalOpen } from '$lib/stores';
	import { onMount } from 'svelte';

	const createApiKey = async () => {
		// Create API Key in keys service and add it to apiKeyList
		const newApiKey = await keyService.createApiKey();

		$createdApiKey = newApiKey;
		$keySuccessModalOpen = true;

		$apiKeyList = await keyService.listApiKeys();
	}

	onMount(async () => {
		$apiKeyList = await keyService.listApiKeys();
	});

</script>

<svelte:head>
	<title>Manage API Keys | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="flex justify-between items-center">
			<h3 class="text-2xl font-bold">Manage API Keys</h3>
			<StyledButton className="btn-outline" action={createApiKey}>
				<img src={"/assets/button/plus.svg"} alt="+" class="inline mr-3" />
				Create a Key
			</StyledButton>
		</div>
	</header>
	<div class="divider mt-4 mb-12" />

	<KeyTable />
</div>

<style>
	.main {
		padding: 70px;
		overflow: none;
	}

</style>
