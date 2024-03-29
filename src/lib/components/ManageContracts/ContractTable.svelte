<script lang="ts">
	import { Role, commonErrorHandler } from "$lib/common";
	import { authService, contractService, type Contract } from "$lib/services";
	import { contractList, contractCreateModalOpen,
		contractGamesModalOpen, contractFunctionsModalOpen,
		currentUser, networkList, platformList, toast, selectedContract } from "$lib/stores";
	import { copyText, formatAddr, formatDate } from "$lib/utils";

	import StyledButton from "../StyledButton.svelte";
	import ContractDropdown from "./ContractDropdown.svelte";

	let copyIcon = "/assets/dropdown/copy.svg";
	let copiedIcon = "/assets/dropdown/copied.svg";

	let copiedIdx: number | undefined;

	const openCreateContract = () => {
		$contractCreateModalOpen = true;
	}

	const reactivateContract = async (contract: Contract) => {
		try {
			await contractService.reactivateContract(contract.id);
			$contractList = await contractService.listContracts();

			$toast.show("success", "Contract reactivated!");
		} catch (e: any) {
			return commonErrorHandler(e, "contract");
		}
	}

	const handleCopy = (address: string, idx: number) => {
		copiedIdx = idx;
		copyText(address)

		setTimeout(() => {
			copiedIdx = undefined;
		}, 2000);
	}

	const showMore = (contract: Contract, type: "games" | "functions") => {
		$selectedContract = contract;
		switch (type) {
			case "games":
				$contractGamesModalOpen = true;
			break;

			case "functions":
				$contractFunctionsModalOpen = true;
			break;
		}
	}

	const getAssociatedGames = (contract: Contract) => {
		return $platformList.filter(plat => contract.platformIds.includes(plat.id));
	}

</script>

{#if $contractList?.length > 0}
	<div class="main-table w-full">
		<div class="flex flex-nowrap py-4 px-5 font-bold">
			<p class="col mr-2">Name</p>
			<p class="w-1/6 mr-2">Contract Address</p>
			<p class="col mr-2">Network</p>
			<p class="w-1/6 mr-2">Games</p>
			<p class="w-1/6 mr-2">Functions</p>
			<p class="w-1/12"></p>
		</div>
		<div class="rows">
			{#each $contractList as contract, i}
				{@const networkName = contractService.getNameByNetworkId(contract.networkId, $networkList)}
				{@const associatedGames = getAssociatedGames(contract)}

				<div class="row flex flex-nowrap items-center px-5 py-8 font-medium text-sm">
					<div class="col mr-2">
						<p class="font-semibold select-all break-words" class:deactivated={contract.deactivatedAt}>{contract.name}</p>
					</div>
					<div class="w-1/6 mr-2 flex items-center">
						<span class="select-all text-clip break-all" class:deactivated={contract.deactivatedAt}>{formatAddr(contract.address, 8)}</span>
						<button on:click={() => handleCopy(contract.address, i)}>
							<img src={copiedIdx == i ? copiedIcon : copyIcon} alt="copy" class="mx-2" width="16px" height="16px" />
						</button>
					</div>
					<div class="col mr-2 flex items-center">
						<img src={contractService.getNetworkIconPath(networkName)} alt={`${networkName} logo`} class="mr-2" />
						<p class="select-all break-words" class:deactivated={contract.deactivatedAt}>{networkName}</p>
					</div>
					<div class="w-1/6 mr-2 flex flex-col">
						{#each associatedGames.slice(0, 2) as platform}
							<div class="bg-info text-gray-blue-10 rounded-md px-2 py-1 w-fit mb-1">
								<p class="select-all break-words">{platform.name}</p>
							</div>
						{/each}
						{#if associatedGames.length > 2}
							<button on:click={() => showMore(contract, "games")} class="bg-[#F2F2F2] text-sm rounded-[4px] w-24 h-6">
								See more
								<img src="/assets/button/plus_neutral.svg" alt="plus" class="inline ml-1" />
							</button>
						{/if}
					</div>
					<div class="w-1/6 mr-2 flex flex-col">
						{#each contract.functions.slice(0, 2) as func}
							<div class="bg-info text-gray-blue-10 rounded-md px-2 py-1 w-fit mb-1">
								<p class="select-all break-words">{func}</p>
							</div>
						{/each}
						{#if contract.functions.length > 2}
							<button on:click={() => showMore(contract, "functions")} class="bg-[#F2F2F2] text-sm rounded-[4px] w-24 h-6">
								See more
								<img src="/assets/button/plus_neutral.svg" alt="plus" class="inline ml-1" />
							</button>
						{/if}
					</div>
					<div class="w-1/12 flex items-center justify-end info">
						{#if authService.canView($currentUser.role, Role.ADMIN)}
							{#if contract.deactivatedAt}
								<p class="text-xs deactivated font-semibold tabular-nums select-all">Deactivated {formatDate(contract.deactivatedAt)}</p>
								<StyledButton className="btn-warning rounded-3xl ml-6" action={() => reactivateContract(contract)}>Reactivate</StyledButton>
							{:else}
								<ContractDropdown {contract} />
							{/if}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center">
		<img src="/assets/card/contract_icon.svg" alt="key" width="75px" height="75px" />
		{#if $platformList.length > 0}
			<h6 class="font-bold my-9 text-center">You haven't added any smart contracts yet. Add one to use it with our services.</h6>
			{#if authService.canView($currentUser.role, Role.ADMIN)}
				<StyledButton className="btn-wide" action={openCreateContract}>Add Smart Contract</StyledButton>
			{:else}
				<span class="text-sm">
					<img src="/assets/info.svg" alt="info" class="inline mr-2" />
					Members do not have permission to manage contracts.
				</span>
			{/if}
		{:else}
			<h6 class="font-bold my-9 text-center">You need to create a Game first.</h6>
		{/if}
	</div>
{/if}

<style>
	.row {
		border-top: 1px solid #f2f2f2;
	}

	.col {
		width: 20%;
	}

	.deactivated {
		color: #bebcba;
	}

	.main-table {
		border: 1px solid #f2f2f2;
		border-radius: 4px;
	}

	@media (max-width: 1000px) {
		.row {
			flex-direction: column;
			row-gap: 20px;
			justify-content: center;
			text-align: center;
		}

		.info {
			white-space: nowrap;
			flex-direction: column;
			row-gap: 10px;
		}
	}
</style>
