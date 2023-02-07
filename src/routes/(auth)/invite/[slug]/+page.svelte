<script lang="ts">
	import AcceptInvite from '$lib/modals/invite/AcceptInvite.svelte';
	import InviteFailed from '$lib/modals/invite/InviteFailed.svelte';

	import { activeModal, _invite } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	if (!data || !data.id) {
		console.error("No invite data found, redirecting to invite failed modal");
		$activeModal = InviteFailed;
	} else {
		$_invite = { id: data.id };
		$activeModal = AcceptInvite;
	}

	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:component this={$activeModal} />
