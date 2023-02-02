<script lang="ts">
	import AcceptInvite from "$lib/modals/invite/AcceptInvite.svelte";
	import InviteFailed from "$lib/modals/invite/InviteFailed.svelte";
	import { activeModal, inviteId, invitee, getInviteDataById } from "$lib/stores";
	import { onDestroy } from "svelte";
	import type { PageData } from './$types';

	export let data: PageData;

	$inviteId = data.id;

	try {
		$invitee = getInviteDataById(data.id);
		$activeModal = AcceptInvite;
	} catch (e: any) {
		$activeModal = InviteFailed;
	}


	onDestroy(() => {
		$activeModal = null;
	});
	
</script>

<svelte:component this={$activeModal} />