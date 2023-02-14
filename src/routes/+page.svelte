<script lang="ts">
	import { onMount, SvelteComponent } from 'svelte';
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte';
	import InviteTeammate from '$lib/modals/team/InviteTeammate.svelte';
	import RemoveTeammate from '$lib/modals/team/RemoveTeammate.svelte';
	
	import Dashboard from '$lib/views/Dashboard.svelte';
	import ManageTeam from '$lib/views/ManageTeam.svelte';
	import ManageKeys from '$lib/views/ManageKeys.svelte';
	import Settings from '$lib/views/Settings.svelte';

	import { MenuItems, activeTab, menuItems } from '$lib/stores';
	import { authService } from '$lib/services';

	let isLoggedIn = false;

	onMount(async () => {
		/* Set the view for each menu item */
		const mapViewsToMenuItems = new Map<MenuItems, typeof SvelteComponent>();

		mapViewsToMenuItems.set(MenuItems.DASHBOARD, Dashboard);
		mapViewsToMenuItems.set(MenuItems.MANAGE_TEAM, ManageTeam);
		mapViewsToMenuItems.set(MenuItems.MANAGE_KEYS, ManageKeys);
		mapViewsToMenuItems.set(MenuItems.SETTINGS, Settings);
		
		$menuItems.forEach((item) => item.view = mapViewsToMenuItems.get(item.name));
		/* End Set the view for each menu item */

		isLoggedIn = false;
		try {
			isLoggedIn = await authService.isUserLoggedIn();
		} catch (error) {
			console.log(error);
		}

		if (!isLoggedIn) {
			window.location.href = '/login';
			return
		}

		$activeTab = $menuItems[0];
	});

</script>

<svelte:head>
	<title>String Dashboard</title>
</svelte:head>

{#if isLoggedIn}
	<div class="root h-full">
		<SideMenu />

		<div class="content">
			<svelte:component this={$activeTab?.view} />
		</div>

		<!-- In-page modals -->
		<InviteTeammate />
		<RemoveTeammate />
	</div>
{/if}

<style>
	.content {
		transform: translate(260px);
		width: calc(100% - 260px);
		height: 100%;
	}

</style>
