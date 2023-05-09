<script lang="ts">
	import { onMount } from "svelte";
	import { platformService, type Platform } from "$lib/services";
	import { platformList } from "$lib/stores";

	export let platform: Platform | null = null;
	
	let dropdownElem: HTMLButtonElement;
	let dropdownOpen = false;

	const assetPath = "/assets/dropdown/";

	// [src, alt text]
	const radioActive = [assetPath + "radio_checked.svg", "radio-checked"];
	const radioInactive = [assetPath + "radio_inactive.svg", "radio-inactive"];

	onMount(async () => {
		$platformList = await platformService.listPlatforms();

		if ($platformList.length > 0) {
			platform = $platformList[0];
		}
	});

	const toggleDropdown = () => {
		if (dropdownOpen) {
			dropdownElem.blur();
			dropdownOpen = false;
		} else {
			dropdownOpen = true;
		}
	};


</script>
<div class="dropdown dropdown-bottom dropdown-end w-full">
	<div class="box flex justify-between p-3">
		<span>{platform?.name ?? ""}</span>
		<button class="flex items-center" on:click|preventDefault={toggleDropdown} on:blur={toggleDropdown} bind:this={dropdownElem}>
			<span class="">Select Game</span>
			<img src="/assets/dropdown/dropdown_arrow.svg" alt="dropdown" class="inline ml-2" width="12px" height="12px" />
		</button>
	</div>

	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu w-40">
		{#key platform}
			{#each $platformList as plat}
				{@const active = plat === platform}
				<li class:active>
					<button on:click={() => platform = plat} class="font-bold text-xs tracking-wider uppercase">
						<img src={active ? radioActive[0] : radioInactive[0]} alt={active ? radioActive[1] : radioInactive[1]} />
						<p class="my-1">{plat.name}</p>
					</button>
				</li>
			{/each}
		{/key}
	</ul>
</div>

<style>
	.box {
		border: 1px solid #BEBCBA;
		border-radius: 4px;
	}

	.active {
		background-color: #dff1ff;
	}

	.dropdown-content {
		border: 1px solid #e6e4df;
		border-radius: 4px;
		background-color: #faf9f9;
	}
</style>