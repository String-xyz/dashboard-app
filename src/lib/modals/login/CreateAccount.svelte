<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import Login from './Login.svelte';
	import VerifyEmail from './VerifyEmail.svelte';

	import { activeModal, user } from '$lib/stores';
	import { z } from 'zod';
	import { apiClient } from '$lib/services';

	let fullNameInput: string;
	let companyNameInput: string;
	let emailInput: string;

	const emailSchema = z.string().trim().email();
	const nameSchema = z.string().min(1);
	let isEmailValid = false;

	// Bind a verification function to the email input. This will be called every time the input changes
	$: {
		try {
			emailSchema.parse(emailInput);
			isEmailValid = true;
		} catch (error) {
			isEmailValid = false;
		}
	}


	$: disabled = false;

	const createAccount = async () => {
		if (!isEmailValid) return console.error("Invalid email or password");

		try {
			const platform = await apiClient.createPlatform(companyNameInput, emailInput, fullNameInput);
			console.debug(platform);
			$user.email = emailInput;
			$activeModal = VerifyEmail;
		} catch (error) {
			console.log(error);
		}
	}

</script>

<ModalBase>
	<div class="main flex flex-col items-center">
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-12 mt-7" />
		<h3 class="text-2xl font-bold">Create a Company account</h3>
		<p class="my-8">Unlock the magic of String’s API by entering your email below.</p>

		<StyledInput
			className="mb-6 w-full"
			label="Your Full Name"
			placeholder="Ex. John Doe"
			bind:val={fullNameInput}
		/>
		<StyledInput
			className="mb-6 w-full"
			label="Company Name"
			placeholder="Enter Company name"
			bind:val={companyNameInput}
		/>
		<StyledInput
			className="mb-8 w-full"
			label="Email"
			placeholder="Enter email"
			bind:val={emailInput}
		/>

		<StyledButton className="w-full" {disabled} action={createAccount}>Continue</StyledButton>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span>Have an account? 
			<span on:click={() => ($activeModal = Login)} class="link link-primary mt-2">
				Login
			</span>
		</span>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
	}
</style>
