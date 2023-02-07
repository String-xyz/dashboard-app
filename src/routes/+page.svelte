<script lang="ts">
	import { activeTab, activeModal } from '$lib/stores';
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte';

</script>

<svelte:head>
  <title>String Dashboard</title>
</svelte:head>

<div class="main" class:backdrop={$activeModal}>
	<SideMenu />

	<div class="content">
		<svelte:component this={$activeTab?.view} />
	</div>
</div>

<style>
	.content {
		transform: translate(260px);
		width: calc(100% - 260px);
		height: 100%;
	}

	/* .backdrop {
		filter: blur(4px);
	} */

</style>
