<script lang="ts">
	import { platformList } from "$lib/stores";
	import type { Platform } from "$lib/services";

	export let selectedGames: Platform[];

	let showDropdown = true;

	const showAddGame = () => {
		showDropdown = true;
	}

	const cancelAddGame = () => {
		showDropdown = false;
	}

	const addGameToList = (platform: Platform) => {
		selectedGames = [...selectedGames, platform];
		showDropdown = false;
	}

	const removeGameFromList = (removeGameIdx: number) => {
		selectedGames = selectedGames.filter((_, idx) => idx != removeGameIdx);
	}

	const getFilteredList = () => {
		return $platformList.filter((platform) => !selectedGames.includes(platform));
	}


</script>


<div class="flex flex-col justify-center items-center mt-4 w-full">
	{#if showDropdown}
		<div class="border border-[#E6E4DF] rounded-[4px] bg-white h-[100px] w-full overflow-scroll">
			{#each getFilteredList() as platform}
				<button class="flex items-center p-3 hover:bg-[#FAF9F9] w-full" on:click|preventDefault={() => addGameToList(platform)}>
					<img src="/assets/game_icon.svg" alt="game" class="mr-2" />
					<span class="text-medium">{platform.name}</span>
				</button>
			{:else}
				<div class="flex w-full justify-center items-center mt-4">
					<h1 class="font-semibold m-4 mr-4">All games added</h1>
					<button on:click={cancelAddGame} class="bg-transparent border rounded-3xl border-[#BEBCBA] text-neutral w-24 h-11 mr-4">
						Cancel
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="border border-[#F2F2F2] rounded-[4px] bg-white w-full h-[100px] overflow-scroll">
			{#each selectedGames as platform, i}
				<div class="flex justify-between items-center p-3" class:row={i > 0}>
					<p class="text-semibold text-primary">{platform.name}</p>
					<div class="flex">
						<button on:click={() => removeGameFromList(i)} class="">
							<img src="/assets/dropdown/trash.svg" alt="delete" width="24px" height="24px" />
						</button>
					</div>
				</div>
			{:else}
				<h1 class="font-semibold m-4">No games added</h1>
			{/each}
		</div>	
	{/if}

	<button on:click|preventDefault={showAddGame} class="text-primary bg-transparent mt-3 w-1/3 h-10">
		<img src="/assets/button/plus.svg" alt="+" class="inline mr-3" />
		Add Game
	</button>
</div>

<style>
	.row {
		border-top: 1px solid #F2F2F2;
	}
</style>
