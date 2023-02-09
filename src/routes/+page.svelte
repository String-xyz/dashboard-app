<script lang="ts">
	import SideMenu from '$lib/components/SideMenu/SideMenu.svelte';
	import InviteTeammate from '$lib/modals/team/InviteTeammate.svelte';
	import RemoveTeammate from '$lib/modals/team/RemoveTeammate.svelte';
	
	import { activeTab, activeModal } from '$lib/stores';

</script>

<svelte:head>
	<title>String Dashboard</title>
</svelte:head>

<div class="root h-full" class:backdrop={$activeModal}>
	<SideMenu />

	<div class="content">
		<svelte:component this={$activeTab?.view} />
	</div>

	<!-- In-page modals -->
	<InviteTeammate />
	<RemoveTeammate />
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
