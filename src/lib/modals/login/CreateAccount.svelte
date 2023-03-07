<script lang="ts">
	import { z } from "zod";

	import ModalBase from "../ModalBase.svelte";
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import Login from "./Login.svelte";
	import VerifyEmail from "./VerifyEmail.svelte";

	import { activeModal, loginEmail, toast } from "$lib/stores";
	import { apiClient } from "$lib/services";

	let fullNameInput: string;
	let companyNameInput: string;
	let emailInput: string;

	const emailSchema = z
		.string()
		.trim()
		.email()
		.transform((email) => email.toLowerCase());
	const nameSchema = z.string().min(1);
	let inputsValid = false;

	// Bind a verification function to the email input. This will be called every time the input changes
	$: {
		try {
			emailSchema.parse(emailInput);
			nameSchema.parse(companyNameInput);

			inputsValid = true;
		} catch (error) {
			inputsValid = false;
		}
	}

	$: disabled = false;

	const createAccount = async () => {
		if (!inputsValid) return $toast.show("error", "Please fill out all fields");

		try {
			const platform = await apiClient.createPlatform(companyNameInput, emailInput.toLowerCase(), fullNameInput);
			console.debug(platform);
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

		<StyledInput className="mb-6 w-full" label="Your Full Name" placeholder="Ex. John Doe" bind:val={fullNameInput} required />
		<StyledInput className="mb-6 w-full" label="Company Name" placeholder="Enter Company name" bind:val={companyNameInput} required />
		<StyledInput className="mb-8 w-full" type="email" label="Email" placeholder="Enter email" bind:val={emailInput} required />

		<StyledButton className="w-full mb-6" {disabled} type="submit">Continue</StyledButton>
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
