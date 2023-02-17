<script lang="ts">
	import { apiClient } from '$lib/services';

	import UserCard from '$lib/components/ManageTeam/UserCard.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import { deactModalOpen, deactUser } from '$lib/stores';

	const handleDeactivate = async () => {
		// Deactivate user
		try {
			if (!$deactUser) return;

			if ($deactUser.isInvite) await apiClient.revokeInvite($deactUser?.id);
			else await apiClient.deactivateMember($deactUser?.id);

			$deactModalOpen = false;
			// TODO: Show success notification
		} catch (e) {
			console.error(e);
			// TODO: Show error notification
		}
		
	}

	const close = () => {
		$deactUser = null;
		$deactModalOpen = false;
	}

</script>

<input type="checkbox" id="deact-modal" class="modal-toggle" bind:checked={$deactModalOpen} />

<label for="deact-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="main flex flex-col items-center w-full">
			<button class="ml-auto mb-1" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<h3 class="text-3xl font-bold mb-12">Hold on...</h3>
			{#if $deactUser?.isInvite}
				<p class="text-center">Are you sure you want to revoke this invite? They will lose the ability to join String’s admin panel.</p>
			{:else}
				<p class="text-center">Are you sure you want to remove this teammate? They will lose access to all of String’s admin panel.</p>
			{/if}

			{#if $deactUser}
				<UserCard user={$deactUser} className="my-12"/>
			{/if}

			<StyledButton className="btn-warning w-full" action={handleDeactivate}>
				{$deactUser?.isInvite ? "Revoke" : "Remove"}
			</StyledButton>
			<button class="mt-7 p-1 bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase" on:click={close}>
				Cancel
			</button>
		</div>
	</label>
</label>

<style>
	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 36px;
		padding-right: 36px;
		padding-top: 36px;
		border-radius: 8px;
		width: 600px;
		height: 480px;
	}

</style>