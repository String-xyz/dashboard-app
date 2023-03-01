<script lang="ts">
	import UserCard from '$lib/components/ManageTeam/UserCard.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';

	import { transferOwnerModalOpen, ownershipTransferee } from '$lib/stores';

	let pwdInput: string;

	const handleTransferOwnership = () => {
		console.log("[Mock] Transferring ownership of platform to " + $ownershipTransferee?.name)
		// Call transferOwnership
	}

	const close = () => {
		$ownershipTransferee = null;
		$transferOwnerModalOpen = false;
	}

</script>

<input type="checkbox" id="transfer-modal" class="modal-toggle" bind:checked={$transferOwnerModalOpen} />

<label for="transfer-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<form on:submit={handleTransferOwnership} class="main flex flex-col items-center w-full">
			<button class="ml-auto mb-2" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<h3 class="text-2xl font-bold mb-6">Transfer Ownership?</h3>
			<p class="text-center">Are you sure you want to transfer your platform ownership to this person? You will lose owner access to all of String’s admin panel.</p>

			{#if $ownershipTransferee}
				<UserCard user={$ownershipTransferee} className="my-8"/>
			{/if}

			<!-- Silence a11y warning -->
			<input autocomplete="username" hidden class="hidden" />

			<StyledInput
				className="mb-12 w-full"
				label="Enter Password"
				type="password"
				autocomplete="current-password"
				placeholder="********"
				bind:val={pwdInput}
				required
			/>

			<StyledButton className="btn-warning w-full" type="submit">
				Transfer Ownership
			</StyledButton>
			<button class="mt-7 p-1 bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase" on:click={close}>
				Cancel
			</button>
		</form>
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
		max-width: 600px;
		height: 550px;
		max-height: 600px;
	}

</style>