<script lang="ts">
	import CreateAccount from "$lib/modals/login/CreateAccount.svelte";
	import Login from "$lib/modals/login/Login.svelte";

	import { activeModal } from "$lib/stores";
	import { onMount, onDestroy } from "svelte";

	onMount(() => {
		$activeModal = CreateAccount;
	});

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:component this={$activeModal} />