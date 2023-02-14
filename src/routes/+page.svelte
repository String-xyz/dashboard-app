<script lang="ts">
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte';
	import InviteTeammate from '$lib/modals/team/InviteTeammate.svelte';
	import RemoveTeammate from '$lib/modals/team/RemoveTeammate.svelte';
	import KeyCreateSuccess from '$lib/modals/keys/KeyCreateSuccess.svelte';

	import { onMount } from 'svelte';
	import { activeTab, menuItems } from '$lib/stores';
	import { authService } from '$lib/services';

	let isLoggedIn = false;

	onMount(async () => {
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
		<KeyCreateSuccess />
	</div>
{/if}

<style>
	.content {
		transform: translate(260px);
		width: calc(100% - 260px);
		height: 100%;
	}

</style>
