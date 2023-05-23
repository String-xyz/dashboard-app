<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { authService } from '$lib/services';
	import { activeModal } from '$lib/stores';

	import Login from '$lib/modals/login/Login.svelte';

	$activeModal = Login;

	onMount(async () => {
		/* If user is already logged in, redirect to dashboard */
		if (await authService.isUserLoggedIn()) {
			window.location.href = "/";
		}
	});

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:head>
	<title>Login | String Dashboard</title>
</svelte:head>

<svelte:component this={$activeModal} />
