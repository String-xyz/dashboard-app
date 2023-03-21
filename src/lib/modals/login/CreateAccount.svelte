<script lang="ts">
	import ModalBase from "../ModalBase.svelte";
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import Login from "./Login.svelte";
	import VerifyEmail from "./VerifyEmail.svelte";

	import { activeModal, loginEmail, toast } from "$lib/stores";
	import { validator } from '$lib/utils';
	import { apiClient } from "$lib/services";

	let ownerNameInput: string;
	let companyNameInput: string;
	let emailInput: string;

	let isOwnerNameValid = true;
	let isCompanyNameValid = true;
	let isEmailValid = true;

	const isValidInput = () => {
		isOwnerNameValid = validator.isValidName(ownerNameInput);
		isCompanyNameValid = validator.isValidName(companyNameInput);

		emailInput = validator.normalizeEmail(emailInput);
		isEmailValid = validator.isValidEmail(emailInput);

		return isOwnerNameValid && isCompanyNameValid && isEmailValid;
	}

	const createAccount = async () => {
		if (!isValidInput()) return $toast.show("error", "Please fill out all fields");

		try {
			await apiClient.createPlatform(companyNameInput, emailInput, ownerNameInput);

			$loginEmail = emailInput;
			$activeModal = VerifyEmail;
		} catch (e: any) {
			console.error(e);

			if (e.code === "CONFLICT") return $toast.show("error", "This email is already in use", "Error");

			$toast.show("error", "Error creating account");
		}
	};
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
			autofocus
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
		<span
			>Have an account?
			<span on:click={() => ($activeModal = Login)} class="link link-primary mt-2"> Login </span>
		</span>
	</form>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
	}
</style>
