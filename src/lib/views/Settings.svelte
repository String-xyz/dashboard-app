<script lang="ts">
	import { onMount } from 'svelte';
	import { activeSettingsTab, SettingsTab } from '$lib/stores';

	const switchTab = (tab: SettingsTab) => {
		$activeSettingsTab = tab;
	}

</script>

<svelte:head>
	<title>Settings | String Dashboard</title>
</svelte:head>

<div class="main">
	<header>
		<div class="tabs">
			<button 
				on:click={() => switchTab(SettingsTab.MY_ACCOUNT)}
				class="tab tab-bordered"
				class:tab-active={$activeSettingsTab == SettingsTab.MY_ACCOUNT}
			>My Account</button> 
			<button 
				on:click={() => switchTab(SettingsTab.MY_ACCOUNT)}
				class="tab tab-bordered"
				class:tab-active={$activeSettingsTab == SettingsTab.PLATFORM_DETAILS}
			>Platform Details</button> 
			<button 
				on:click={() => switchTab(SettingsTab.MY_ACCOUNT)}
				class="tab tab-bordered"
				class:tab-active={$activeSettingsTab == SettingsTab.CHANGE_PASSWORD}
			>Change Password</button>
		</div>
	</header>
	<div class="divider mt-0 mb-7" />

</div>

<style lang='postcss'>
	.main {
		padding: 70px;
		overflow: none;
	}

	.tab {
		@apply text-neutral;
		@apply font-medium;
	}

	.tab-active {
		@apply text-primary;
	}

	/* @media (max-width: 800px) {
		.header {
			flex-direction: column;
			row-gap: 20px;
		}
	} */

</style>
