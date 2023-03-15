<script lang="ts">
	import UserCard from '$lib/components/ManageTeam/UserCard.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';

	import { transferOwnerModalOpen, ownershipTransferee, currentUser, teamItems, toast } from '$lib/stores';
	import { apiClient, teamService } from '$lib/services';
	import { validator } from '$lib/utils';
	import { Role } from '$lib/types';

	let pwdInput: string;

	$: showPwdInvalid = false;

	$: disabled = !validator.isValidPwd(pwdInput);

	const handleTransferOwnership = async () => {
		if ($ownershipTransferee) {
			console.debug("Transferring ownership of platform to " + $ownershipTransferee?.name);

			try {
				await apiClient.transferOwnership($ownershipTransferee.id, pwdInput);

				$currentUser.role = Role.ADMIN;
				$teamItems = await teamService.rebuildTeamList();

				close();
				$toast.show("success", "Ownership transferred!");
			} catch (e: any) {
				if (e.message = "Invalid password") {
					showPwdInvalid = true;
					setTimeout(() => {
						showPwdInvalid = false;
					}, 3000);
				}
				console.error(e);
			}
		}
	}

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($transferOwnerModalOpen) {
			if (e.key == "Enter") {
				handleTransferOwnership();
			}
			if (e.key == "Escape") {
				close();
			}
		}
	}

	const close = () => {
		pwdInput = "";
		$ownershipTransferee = null;
		$transferOwnerModalOpen = false;
	}

</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="transfer-modal" class="modal-toggle" bind:checked={$transferOwnerModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="main flex flex-col items-center w-full">
			<button class="ml-auto mb-2" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<h3 class="text-2xl font-bold mb-6">Transfer Ownership?</h3>
			<p class="text-center">Are you sure you want to transfer your platform ownership to this person? You will lose owner access to all of String’s admin panel.</p>

			{#if $ownershipTransferee}
				<UserCard user={$ownershipTransferee} className="my-8"/>
			{/if}

			<!-- Silence a11y warning -->
			<input autocomplete="username" hidden class="hidden" />

			<StyledInput
				className="w-full"
				label="Enter Password"
				type="password"
				autocomplete="current-password"
				placeholder="********"
				bind:val={pwdInput}
				required
			/>
			{#if showPwdInvalid && pwdInput !== ""}
				<p class="text-error mt-2 mb-9 mr-auto">Invalid password</p>
			{:else}
				<div class="mb-12" />
			{/if}

			<StyledButton className="btn-warning w-full" action={handleTransferOwnership} {disabled}>
				Transfer Ownership
			</StyledButton>
			<button class="mt-7 p-1 bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase" on:click={close}>
				Cancel
			</button>
		</div>
	</div>
</div>

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