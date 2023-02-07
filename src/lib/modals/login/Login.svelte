<script lang="ts">
	import { z } from 'zod';
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import ForgotPassword from '../reset/ForgotPassword.svelte';
	import CreateAccount from './CreateAccount.svelte';
	import LoginSuccess from './LoginSuccess.svelte';

	import { activeModal } from '$lib/stores';

	let emailInput = "";
	let pwdInput = "";

	const emailSchema = z.string().trim().email();
	const passwordSchema = z.string().min(8);

	let isEmailValid = false;
	let isPassValid = false;	

	$: disabled = false;

	// Bind a verification function to the email input
	$: {
		try {
			emailSchema.parse(emailInput);
			isEmailValid = true;
		} catch (error) {
			isEmailValid = false;
		}
	}

	// Bind a verification function to the password input
	$: {
		try {
			passwordSchema.parse(pwdInput);
			isPassValid = true;
		} catch (error) {
			isPassValid = false;
		}
	}


	const handleLogin = async () => {
		if (!isEmailValid || !isPassValid) return console.debug("Invalid email or password");

		try {
			// const member = await apiClient.login(emailInput, pwdInput);
			$activeModal = LoginSuccess
			localStorage.setItem('loggedIn', 'true');
		} catch (error) {
			console.error(error);
		}
	};

</script>

<ModalBase>
	<div class="main flex flex-col items-center">
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-12" />
		<h3 class="text-2xl font-bold">Login to String’s Developer dashboard</h3>
		<p class="my-8">Unlock the magic of String’s API by entering your email below.</p>
		<StyledInput
			className="mb-6 w-full"
			label="Email"
			placeholder="Enter email"
			bind:val={emailInput}
			autofocus
		/>
		<StyledInput
			className="mb-2 w-full"
			type="password"
			label="Password"
			placeholder="********"
			bind:val={pwdInput}
		/>
		<!-- Add visibility icon and allow to show and hide pwd -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<p on:click={() => ($activeModal = ForgotPassword)} class="text-sm cursor-pointer mb-8 ml-auto">
			Forgot password?
		</p>
		<StyledButton className="w-full" {disabled} action={handleLogin}>Login</StyledButton>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span class="mt-4">New to String? 
			<span
				on:click={() => ($activeModal = CreateAccount)}
				class="link link-primary">Create an account
			</span>
		</span>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
		padding-top: 50px;
		padding-bottom: 32px;
	}
</style>
