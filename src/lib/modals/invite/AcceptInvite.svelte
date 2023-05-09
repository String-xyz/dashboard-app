<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import UserCard from '$lib/components/ManageTeam/UserCard.svelte';

	import InviteSuccess from './InviteSuccess.svelte';
	import InviteFailed from './InviteFailed.svelte';
	
	import { activeModal, currentUser, _invite, _inviteToken } from '$lib/stores';
	import { validator } from "$lib/utils";
	import { authService } from '$lib/services';

	let pwdInput: string;

	$: isPwdValid = validator.isValidPwd(pwdInput);

	$: disabled = !isPwdValid;

	const acceptInvite = async () => {
		try {
			if (!pwdInput) return;

			const user = await authService.acceptInvite($_invite, pwdInput, $_inviteToken);
			
			$currentUser = user;
			$activeModal = InviteSuccess;
		} catch (e: any) {
			console.error(e);
			$activeModal = InviteFailed;
		}
	}

</script>

<ModalBase size="size-md">
	<form on:submit={acceptInvite} class="main flex flex-col items-center">
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-10" />
		<h3 class="text-2xl font-bold mb-2">You’ve been invited to join</h3>
		<h3 class="text-2xl font-bold mb-2">{$_invite.organizationName}</h3>
		<p>Confirm your invitation by accepting your invite</p>

		{#if $_invite.name}
			<UserCard user={$_invite} className="my-8" />
		{/if}

		<StyledInput
			className="mb-1 w-full"
			type="password"
			label="Set your password"
			autocomplete="new-password"
			placeholder="********"
			bind:val={pwdInput}
			autofocus
			required
		/>
		<p class="mb-9 text-sm mr-auto">Must be at least 8 characters</p>

		<!-- Under password input put Must be at least 8 characters when it fails Zod -->
		<StyledButton className="w-full mb-6" type="submit" {disabled}>Accept Invite</StyledButton>
	</form>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
		padding-top: 56px;
	}
</style>
