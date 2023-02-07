<script lang="ts">
	import { activeTab, getMenuItems } from '$lib/stores';
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte';
	import { onMount } from 'svelte';
	import { authService } from '$lib/services';

	onMount(async () => {
		let isLoggedIn = false;
		try {
			isLoggedIn = await authService.isUserLoggedIn();
		} catch (error) {
			console.log(error);
		}

		if (!isLoggedIn) {
			window.location.href = '/login';;
			return
		}

		$activeTab = getMenuItems()[0];
	});
</script>

<SideMenu />

<div class="content">
	<svelte:component this={$activeTab?.view} />
</div>

<style>
	.content {
		transform: translate(260px);
		width: calc(100% - 260px);
		height: 100%;
	}
</style>
