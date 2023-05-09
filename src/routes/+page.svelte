<script lang="ts">
	import { onMount, SvelteComponent } from "svelte";

	import SideMenu from "$lib/components/SideMenu/SideMenu.svelte";

	/* Views */
	import Dashboard from "$lib/views/Dashboard.svelte";
	import ManageTeam from "$lib/views/ManageTeam.svelte";
	import ManagePlatforms from "$lib/views/ManagePlatforms.svelte";
	import ManageKeys from "$lib/views/ManageKeys.svelte";
	import Settings from "$lib/views/Settings.svelte";

	/* Modals */
	import InviteTeammate from "$lib/modals/team/InviteTeammate.svelte";
	import RemoveTeammate from "$lib/modals/team/RemoveTeammate.svelte";
	import TransferOwnership from "$lib/modals/team/TransferOwnership.svelte";
	import CreatePlatform from "$lib/modals/platform/CreatePlatform.svelte";
	import EditPlatform from "$lib/modals/platform/EditPlatform.svelte";
	import DeactPlatform from "$lib/modals/platform/DeactPlatform.svelte";
	import KeyCreate from "$lib/modals/keys/KeyCreate.svelte";
	import KeySuccess from "$lib/modals/keys/KeySuccess.svelte";

	/* Settings */
	import MyAccount from "$lib/components/Settings/MyAccount.svelte";
	import ChangePassword from "$lib/components/Settings/ChangePassword.svelte";

	import { activeTab, SettingsTab, tabToViewMap } from "$lib/stores";
	import { menuItems, NavItem } from "$lib/constants";
	import { authService } from "$lib/services";

	let isLoggedIn = false;

	onMount(async () => {
		/* Set the view for each menu item */
		const mapViewsToMenuItems = new Map<NavItem, typeof SvelteComponent>();

		mapViewsToMenuItems.set(NavItem.DASHBOARD, Dashboard);
		mapViewsToMenuItems.set(NavItem.MANAGE_TEAM, ManageTeam);
		mapViewsToMenuItems.set(NavItem.MANAGE_PLATFORMS, ManagePlatforms);
		mapViewsToMenuItems.set(NavItem.MANAGE_KEYS, ManageKeys);
		mapViewsToMenuItems.set(NavItem.SETTINGS, Settings);

		menuItems.forEach((item) => (item.view = mapViewsToMenuItems.get(item.name)));
		/* End Set the view for each menu item */

		// Settings tabs
		$tabToViewMap = new Map<SettingsTab, typeof SvelteComponent>();
		$tabToViewMap.set(SettingsTab.MY_ACCOUNT, MyAccount);
		$tabToViewMap.set(SettingsTab.CHANGE_PASSWORD, ChangePassword);

		isLoggedIn = false;
		try {
			isLoggedIn = await authService.isUserLoggedIn();
		} catch (error) {
			console.log(error);
		}

		if (!isLoggedIn) {
			window.location.href = "/login";
			return;
		}

		$activeTab = menuItems[0];
	});
</script>

<svelte:head>
	<title>String Dashboard</title>
</svelte:head>

{#if isLoggedIn}
	<div class="root">
		<SideMenu />

		<div class="content">
			<svelte:component this={$activeTab?.view} />
		</div>

		<!-- In-page modals -->

		<!-- Manage Team -->
		<InviteTeammate />
		<RemoveTeammate />
		<TransferOwnership />

		<!-- Manage Platforms -->
		<CreatePlatform />
		<EditPlatform />
		<DeactPlatform />

		<!-- Manage API Keys -->
		<KeyCreate />
		<KeySuccess />

	</div>
{/if}

<style>
	.content {
		transform: translate(260px);
		width: calc(100% - 260px);
		height: 100%;
	}
</style>
