<script lang="ts">
	import { z } from 'zod';

	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import Login from './Login.svelte';
	import VerifyEmail from './VerifyEmail.svelte';

	import { activeModal, loginEmail } from '$lib/stores';
	import { apiClient } from '$lib/services';

	let ownerNameInput: string;
	let companyNameInput: string;
	let emailInput: string;

	const emailSchema = z.string().trim().email();
	const nameSchema = z.string().min(1);

	let isOwnerNameValid = true;
	let isCompanyNameValid = true;
	let isEmailValid = true;

	const isValidInput = () => {
		isOwnerNameValid = nameSchema.safeParse(ownerNameInput).success;
		isCompanyNameValid = nameSchema.safeParse(companyNameInput).success;
		isEmailValid = emailSchema.safeParse(emailInput).success;

		return isOwnerNameValid && isCompanyNameValid && isEmailValid;
	}

	const createAccount = async () => {
		if (!isValidInput()) return console.error("Invalid email or password");

		try {
			const platform = await apiClient.createPlatform(companyNameInput, emailInput, ownerNameInput);
			console.debug(platform);
			$loginEmail = emailInput;
			$activeModal = VerifyEmail;
		} catch (error) {
			console.log(error);
		}
	}

</script>

<ModalBase>
	<form on:submit={createAccount} class="main flex flex-col items-center">
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-12 mt-7" />
		<h3 class="text-2xl font-bold">Create a Company account</h3>
		<p class="my-8">Unlock the magic of String’s API by entering your email below.</p>

		<StyledInput
			className="mb-6 w-full"
			label="Your full name"
			placeholder="Enter owner name"
			bind:val={ownerNameInput}
			required
		/>
		<StyledInput
			className="mb-6 w-full"
			label="Company name"
			placeholder="Enter company name"
			bind:val={companyNameInput}
			required
		/>
		<StyledInput
			className="mb-8 w-full"
			type="email"
			label="Email address"
			placeholder="Enter email address"
			bind:val={emailInput}
			required
		/>

		<StyledButton className="w-full mb-6" type="submit">Continue</StyledButton>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span>Have an account? 
			<span on:click={() => ($activeModal = Login)} class="link link-primary mt-2">
				Login
			</span>
		</span>
	</form>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
	}

</style>
