<script lang="ts">
	import { networkList } from "$lib/stores";
	import { contractService, type Network } from "$lib/services";

	export let selectedNetwork: Network | null = null;

	let dropdownOpen = false;

	let toggleDropdown = () => {
		dropdownOpen = !dropdownOpen;
	}

	let selectNetwork = (network: Network) => {
		selectedNetwork = network;
		dropdownOpen = false;
	}

</script>

<button 
	on:click|preventDefault={toggleDropdown}
	class="flex justify-between items-center border border-[#BEBCBA] rounded-[4px] w-full p-3"
>
	<span class="font-bold text-sm tracking-wider uppercase">
		{#if selectedNetwork}
			{selectedNetwork.name}
		{:else}
			Select Network
		{/if}
	</span>
	<img src="/assets/button/down_arrow.svg" alt="down" class="" />
</button>

{#if dropdownOpen}
	<div class="border border-[#E6E4DF] rounded-[4px] bg-white h-[160px] overflow-scroll absolute">
		{#each $networkList as network}
			{@const iconPath = contractService.getNetworkIconPath(network.name)}
			<button class="flex items-center p-3 hover:bg-[#FAF9F9] w-full" on:click|preventDefault={() => selectNetwork(network)}>
				<img src={iconPath} alt={`${network.name} logo`} class="mr-2" />
				<span class="mr-2 text-sm font-bold uppercase tracking-wider">{network.name}</span>
				<span class="text-xs text-[#BEBCBA]">{network.chainId}</span>
			</button>
		{/each}
	</div>
{/if}
