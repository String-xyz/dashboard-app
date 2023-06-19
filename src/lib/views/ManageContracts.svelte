<script lang="ts">
	import { onMount } from "svelte";
	import { Role } from "$lib/common";
	import { NavItem } from "$lib/constants";
	import { contractService, apiClient, authService } from "$lib/services";
	import { contractCreateModalOpen, networkList, contractList, toast, currentUser } from "$lib/stores";

	import StyledButton from "$lib/components/StyledButton.svelte";
	import ContractTable from "$lib/components/ManageContracts/ContractTable.svelte";
	import Toast from "$lib/components/Toast.svelte";

	onMount(async () => {
		try {
			if ($networkList.length === 0) {
				$networkList = await apiClient.listNetworks();
			}

			$contractList = await contractService.listContracts();

		} catch (e) {
			console.error(e);
			$toast.show("error", "Error fetching contracts");
		}
	});

	const openCreateContract = async () => {
		$contractCreateModalOpen = !$contractCreateModalOpen;
	}

</script>

<svelte:head>
	<title>{NavItem.MANAGE_CONTRACTS} | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="header flex justify-between items-center">
			<h3 class="text-2xl font-bold">{NavItem.MANAGE_CONTRACTS}</h3>
			{#if authService.canView($currentUser.role, Role.ADMIN)}
				<StyledButton className="btn-outline" action={openCreateContract}>
					<img src={"/assets/button/plus.svg"} alt="+" class="inline mr-3" />
					Add Smart Contract
				</StyledButton>
			{:else}
				<span class="text-sm">
					<img src="/assets/info.svg" alt="info" class="inline mr-2" />
					Members do not have permission to manage contracts.
				</span>
			{/if}
		</div>
	</header>
	<div class="divider mt-4 mb-12" />

	<ContractTable />

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
