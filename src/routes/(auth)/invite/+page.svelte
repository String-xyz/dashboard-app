<script lang="ts">
	import AcceptInvite from "$lib/modals/login/Login.svelte";
	import { activeModal } from "$lib/stores";
	import { onMount, onDestroy } from "svelte";

	onMount(() => {
		$activeModal = AcceptInvite;
	});

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:component this={$activeModal} />