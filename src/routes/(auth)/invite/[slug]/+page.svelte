<script lang="ts">
	import AcceptInvite from "$lib/modals/invite/AcceptInvite.svelte";
	import InviteFailed from "$lib/modals/invite/InviteFailed.svelte";

	import { activeModal, _invite, _inviteToken } from "$lib/stores";
	import { onMount, onDestroy } from "svelte";
	import { authService } from "$lib/services";

	import type { PageData } from "./$types";

	export let data: PageData;

	onMount(async () => {
		if (!data || !data.id || !data.token) {
			console.error("No invite data found, redirecting to invite failed modal");
			return ($activeModal = InviteFailed);
		}

		try {
			const invite = await authService.getInviteById(data.id);
			$_invite = invite;
			$_inviteToken = data.token;
			$activeModal = AcceptInvite;
		} catch (e) {
			console.error(e);
			$activeModal = InviteFailed;
		}
	});

	onDestroy(() => {
		$activeModal = null;
	});
</script>

<svelte:head>
	<title>Invite | String Dashboard</title>
</svelte:head>

<svelte:component this={$activeModal} />
