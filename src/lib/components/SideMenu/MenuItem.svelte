<script lang="ts">
	import { activeTab } from '$lib/stores';
	import type { MenuItem } from '$lib/common';

	export let tab: MenuItem;
</script>

<li class="whitespace-nowrap">
	{#if tab.view}
		<button on:click={() => ($activeTab = tab)} class:active={tab.view === $activeTab.view}>
			<img src={tab.icon} alt="icon" />
			{tab.name}
		</button>
	{:else}
		<a href={tab.href ?? '#'} target="_blank" rel="noreferrer">
			<img src={tab.icon} alt="icon" />
			{tab.name}
		</a>
	{/if}
</li>

<style lang="postcss">
	.active {
		@apply text-neutral;
		background-color: #dff1ff;
		border-radius: 4px;
	}
</style>
