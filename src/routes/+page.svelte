<script lang="ts">
	import { activeTab } from '$lib/stores';
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte';
</script>

<SideMenu />
<svelte:component this={$activeTab.view} />
