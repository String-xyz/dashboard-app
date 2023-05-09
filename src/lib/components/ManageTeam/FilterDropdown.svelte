<script lang="ts">
	import { Role } from "$lib/common";
	import { authService } from "$lib/services";
	import { activeFilter, currentUser } from "$lib/stores";
	import { filterOptions, type FilterOption } from "$lib/constants";

	let dropdownElem: HTMLButtonElement;

	let dropdownOpen = false;

	const assetPath = "/assets/dropdown/"

	// [src, alt text]
	const radioActive = [assetPath + "radio_checked.svg", "radio-checked"]
	const radioInactive = [assetPath + "radio_inactive.svg", "radio-inactive"]

	const toggleDropdown = () => {
		if (dropdownOpen) {
			dropdownElem.blur();
			dropdownOpen = false;
		} else {
			dropdownOpen = true;
		}
	}

	const setActiveFilter = (filter: FilterOption) => {
		$activeFilter = filter;

		const btn = document.activeElement as HTMLButtonElement
		btn.blur();
	}

	const getFilters = () => filterOptions.filter(f => authService.canView($currentUser.role, f.minPerms ?? Role.MEMBER));

</script>

<div class="dropdown dropdown-bottom dropdown-end">
	<button 
		on:click={toggleDropdown}
		on:blur={() => dropdownOpen = false}
		bind:this={dropdownElem}
		tabindex="0"
		class="btn btn-neutral btn-outline rounded-3xl font-bold tracking-wider text-xs"
	>
		{$activeFilter.filter}
		<img src="/assets/button/dropdown_arrow.svg" alt="dropdown" class="ml-3 inline" />	
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu w-60">
		{#each getFilters() as filter}
			{@const active = $activeFilter === filter}
			<li class:active={active}>
				<button on:click={() => setActiveFilter(filter)} class="font-bold text-xs tracking-wider uppercase">
					<img src={ active ? radioActive[0] : radioInactive[0] } alt={ active ? radioActive[1] : radioInactive[1] }/>
					{filter.name}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>

	.active {
		background-color: #DFF1FF; 
	}

	.dropdown-content {
		border: 1px solid #e6e4df;
		border-radius: 4px;
		background-color: #faf9f9;
	}

	.btn-neutral {
		border-color: #003669;
		color: #003669;
	}

	.btn-neutral:hover {
		background-color: #f3f3f3 !important;
	}

</style>