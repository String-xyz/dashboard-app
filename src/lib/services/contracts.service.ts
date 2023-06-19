import type { ApiClient, Contract, ContractDetails, ContractUpdate, Network } from "./apiClient";

const networkAssetPath = "/assets/networks/";

export function createContractService(apiClient: ApiClient) {
	async function createContract(details: ContractDetails): Promise<Contract> {
		return await apiClient.createContract(details);
	}

	async function listContracts(platformId?: string): Promise<Contract[]> {
		const contracts = await apiClient.listContracts(platformId);
		// TODO: Remove null check once backend returns empty array instead of null
		if (!contracts) {
			return [] as Contract[];
		}

		const activeContracts = [];
		const deactContracts = [];

		for (const contract of contracts.reverse()) {
			if (contract.deactivatedAt) {
				deactContracts.push(contract);
			} else {
				activeContracts.push(contract);
			}
		}

		return [...activeContracts, ...deactContracts];
	}

	async function getContract(contractId: string): Promise<Contract> {
		return await apiClient.getContract(contractId);
	}

	async function editContract(contractId: string, update: ContractUpdate): Promise<Contract> {
		return await apiClient.editContract(contractId, update);
	}

	async function deactivateContract(contractId: string) {
		return apiClient.deactivateContract(contractId);
	}

	async function reactivateContract(contractId: string) {
		return apiClient.reactivateContract(contractId);
	}

	function getNameByNetworkId(networkId: string, networks: Network[]) {
		const network = networks.find((network) => network.id === networkId);
		return network ? network.name : "";
	}

	function getNetworkIconPath(networkName: string) {
		if (!networkName) return "";

		const fmtdName = networkName.toLowerCase().replaceAll(" ", "_");
		
		let icon = "";

		// This code allows us to use the same file for networks that use the same icon
		// while still allowing drop in support for new networks
		switch (fmtdName) {
			case "ethereum_mainnet":
			case "goerli_testnet":
				icon = "ethereum";
			break;

			case "avalanche_mainnet":
			case "fuji_testnet":
				icon = "avalanche";
			break;

			case "polygon_mainnet":
			case "mumbai_testnet":
				icon = "polygon";
			break;

			case "arbitrum_nova_mainnet":
			case "nitro_goerli_rollup_testnet":
				icon = "arbitrum";
			break;

			default:
				icon = fmtdName;
		}

		return `${networkAssetPath}${icon}.svg`;
	}

	return { createContract, listContracts, getContract, editContract, deactivateContract, reactivateContract, getNameByNetworkId, getNetworkIconPath };
}
