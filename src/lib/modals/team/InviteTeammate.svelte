<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import { activeModal } from '$lib/stores';
	import { z } from 'zod';
	import RoleDropdown from '$lib/components/ManageTeam/RoleDropdown.svelte';

	let emailInput: string;
	let nameInput: string;

	const emailSchema = z.string().trim().email();
	const nameSchema = z.string().min(0);

	let isEmailValid = false;
	let isPassValid = false;

	const handleSend = () => {
		// Send invite

		$activeModal = null;
	}

</script>

<ModalBase>
	<div class="main flex flex-col items-center">
		<h3 class="text-2xl font-bold">Invite a teammate</h3>
		<!-- <form on:submit|preventDefault={handleVerify}> -->
		<StyledInput
			className="mb-6 w-full"
			type='email'
			label="Email address"
			placeholder="Enter email"
			bind:val={emailInput}
			autofocus
			required
		/>
		<StyledInput
			className="mb-2"
			label="Full name"
			placeholder="John Smith"
			bind:val={nameInput}
			required
		/>
		<RoleDropdown />
		<StyledButton className="w-full" action={handleSend}>
			Send Invite
		</StyledButton>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 36px;
		padding-right: 36px;
		padding-top: 36px;
		backdrop-filter: blur(4px);
	}

</style>
