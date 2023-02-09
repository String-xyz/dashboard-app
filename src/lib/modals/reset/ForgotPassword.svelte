<script lang="ts">
	import { z } from 'zod';
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import PwdResetEmail from './PwdResetEmail.svelte';
	import Login from '../login/Login.svelte';

	import { activeModal, user } from '$lib/stores';
	import { apiClient } from '$lib/services';

	let isEmailValid = false;
	const emailSchema = z.string().trim().email();
	let emailInput: string;
	$: disabled = !isEmailValid;
	
	// validate email input on change
	$: {
		try {
			emailSchema.parse(emailInput);
			isEmailValid = true;
		} catch (error) {
			isEmailValid = false;
		}
	}

	const reset = async () => {
		try {
			await apiClient.sendResetPasswordToken(emailInput);
			$user.email = emailInput;
			$activeModal = PwdResetEmail;
		} catch (e) {
			console.error(e);
		}
	};

	const backToLogin = () => {
		$activeModal = Login;
	};
</script>

<ModalBase size="size-md">
	<div class="main flex flex-col items-center">
		<img src="/assets/auth_key_icon.svg" alt="Key" class="mb-8" />
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
