<script lang="ts">
	import { NavItem } from "$lib/constants";
	import { activeSettingsTab, SettingsTab, tabToViewMap, toast } from "$lib/stores";

	import Toast from "$lib/components/Toast.svelte";

	const switchTab = (tab: SettingsTab) => {
		$activeSettingsTab = tab;
	};
</script>

<svelte:head>
	<title>{NavItem.SETTINGS} | String Dashboard</title>
</svelte:head>

<div class="main">
	<header class="mb-8">
		<div class="tabs">
			<button on:click={() => switchTab(SettingsTab.MY_ACCOUNT)} class="tab tab-bordered" class:tab-active={$activeSettingsTab == SettingsTab.MY_ACCOUNT}
				>My Account</button
			>
			<button
				on:click={() => switchTab(SettingsTab.CHANGE_PASSWORD)}
				class="tab tab-bordered"
				class:tab-active={$activeSettingsTab == SettingsTab.CHANGE_PASSWORD}>Change Password</button
			>
		</div>
	</header>

	<svelte:component this={$tabToViewMap.get($activeSettingsTab)} />

	<Toast type={$toast.type} size="sm" bind:display={$toast._display}>{$toast.message}</Toast>
</div>

<style lang="postcss">
	.main {
		padding: 70px;
		overflow: none;
	}

	.tab {
		@apply text-neutral;
		@apply font-medium;
		@apply uppercase;
		@apply tracking-wider;
		padding-left: 36px;
		padding-right: 36px;
		border-color: #f2f2f2;
	}

	.tabs:first-child {
		padding-left: 0px;
	}

	.tab.tab-active {
		@apply text-primary;
		@apply border-primary !important;
	}
</style>
