<script lang="ts">
	import Login from "$lib/modals/login/Login.svelte";
	import { activeModal } from "$lib/stores";
	import { onMount, onDestroy } from "svelte";

	onMount(() => {
		$activeModal = Login;
	});

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:component this={$activeModal} />