<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import UserCard from '$lib/components/ManageTeam/UserCard.svelte';

	import InviteSuccess from './InviteSuccess.svelte';
	import InviteFailed from './InviteFailed.svelte';
	
	import { z } from 'zod';
	import { activeModal, currentUser, _invite} from '$lib/stores';
	import { authService } from '$lib/services';

	const passwordSchema = z.string().min(8);

	let pwdInput: string;
	let isPassValid = true;

	// Bind a verification function to the password input
	$: {
		try {
			passwordSchema.parse(pwdInput);
			isPassValid = true;
		} catch (error) {
			isPassValid = false;
		}
	}

	$: disabled = !isPassValid;

	const acceptInvite = async () => {
		try {
			const user = await authService.acceptInvite($_invite, pwdInput);
			
			$currentUser = user;
			$activeModal = InviteSuccess;
		} catch (e) {
			console.error(e);
			$activeModal = InviteFailed;
		}
	}

</script>

<ModalBase size="size-md">
	<div class="main flex flex-col items-center">
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-10" />
		<h3 class="text-2xl font-bold mb-2">You’ve been invited to join</h3>
		<h3 class="text-2xl font-bold mb-2">"{$_invite.platformName}"</h3>
		<p>Confirm your invitation by accepting your invite</p>

		{#if $_invite.name}
			<UserCard user={$_invite} className="my-8" />
		{/if}

		<StyledInput
			className="mb-1 w-full"
			type="password"
			label="Set your password"
			placeholder="********"
			bind:val={pwdInput}
			autofocus
			required
		/>
		<p class="mb-9 text-sm mr-auto">Must be at least 8 characters</p>

		<!-- Under password input put Must be at least 8 characters when it fails Zod -->
		<StyledButton className="w-full" action={acceptInvite} {disabled}>Accept Invite</StyledButton>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
		padding-top: 56px;
	}
</style>
