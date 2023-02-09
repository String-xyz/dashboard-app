<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import UserCard from '$lib/components/ManageTeam/UserCard.svelte';

	import InviteSuccess from './InviteSuccess.svelte';

	import { activeModal, invitee } from '$lib/stores';
	import { z } from 'zod';

	const passwordSchema = z.string().min(8);

	let pwdInput: string;

	// Set to true for testing, will be behind Zod parsing
	let isPassValid = true;

	$: disabled = !isPassValid;

	const acceptInvite = () => {
		$activeModal = InviteSuccess;
	}

</script>

<ModalBase size="size-md">
	<div class="main flex flex-col items-center">
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-10" />
		<h3 class="text-2xl font-bold mb-2">You’ve been invited to join</h3>
		<h3 class="text-2xl font-bold mb-2">"{$invitee.platformName}"</h3>
		<p>Confirm your invitation by accepting your invite</p>

		<UserCard user={$invitee} className="my-8" />

		<StyledInput
			className="mb-10 w-full"
			type="password"
			label="Set your password"
			placeholder="********"
			bind:val={pwdInput}
			autofocus
			required
		/>
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
