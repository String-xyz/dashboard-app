<script lang="ts">
	import SetPassword from '$lib/modals/reset/SetPassword.svelte';
	import ResetFailed from '$lib/modals/reset/ResetFailed.svelte';

	import { activeModal, resetToken } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	if (data?.resetToken) {
		resetToken.set(data.resetToken);
		$activeModal = SetPassword;
	} else {
		console.error("No invite data found, redirecting to invite failed modal");
		$activeModal = ResetFailed;
	}

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:component this={$activeModal} />
