<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import PwdResetEmail from './PwdResetEmail.svelte';
	import Login from '../login/Login.svelte';

	import { activeModal } from '$lib/stores';
	import { z } from 'zod';

	const emailSchema = z.string().trim().email();

	let emailInput: string;

	// Set to true for testing, will be behind Zod parsing
	let isEmailValid = true;

	$: disabled = !isEmailValid;

	const reset = () => {
		$activeModal = PwdResetEmail;
	}

	const backToLogin = () => {
		$activeModal = Login;
	}
</script>

<ModalBase size="size-md">
	<div class="main flex flex-col items-center">
		<img src="/assets/email_icon.svg" alt="Email" class="mb-8" />
		<h3 class="text-2xl font-bold mb-2">Forgot password?</h3>
		<p class="mb-8">No worries, we’ll send you reset instructions</p>

		<StyledInput
			className="mb-8 w-full"
			label="Email"
			placeholder="Enter your email"
			bind:val={emailInput}
			autofocus
		/>

		<StyledButton className="mb-8 w-full" action={reset} {disabled}>Reset password</StyledButton>

		<button on:click={backToLogin}>
			<span>
				<img src="/assets/button/left_arrow.svg" alt="<-" class="mr-2 inline" />
				Back to log in
			</span>
		</button>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
		padding-top: 70px;
	}
</style>
