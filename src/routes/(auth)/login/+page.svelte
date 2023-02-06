<script lang="ts">
	import Login from '$lib/modals/login/Login.svelte';

	import { activeModal } from '$lib/stores';
	import { onDestroy } from 'svelte';

	$activeModal = Login;

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:head>
  <title>Login | String Dashboard</title>
</svelte:head>

<svelte:component this={$activeModal} />
