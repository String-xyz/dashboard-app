<script lang="ts">
	import ModalBase from "../ModalBase.svelte";
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import ForgotPassword from "../reset/ForgotPassword.svelte";
	import CreateAccount from "./CreateAccount.svelte";
	import LoginSuccess from "./LoginSuccess.svelte";

	import { activeModal, currentUser, loginEmail, toast } from "$lib/stores";
	import { authService, ErrorCode } from "$lib/services";
	import { commonErrorHandler } from "$lib/common";
	import { validator } from "$lib/utils";

	let emailInput = "";
	let pwdInput = "";

	let isEmailValid = true;
	let isPassValid = true;

	$: disabled = false;

	const isValidInput = () => {
		isEmailValid = validator.isValidEmail(emailInput);
		isPassValid = validator.isValidPwd(pwdInput);

		return isEmailValid && isPassValid;
	};

	const handleLogin = async (e: any) => {
		if (!isValidInput()) return;

		emailInput = validator.normalizeEmail(emailInput);
		$loginEmail = emailInput;
	
		try {
			const user = await authService.login(emailInput, pwdInput);

			$currentUser = user;
			$activeModal = LoginSuccess;

			$toast.show("success", "Login successful");
		} catch (e: any) {
			if (e.code === ErrorCode.UNAUTHORIZED) {
				return $toast.show("error", "Invalid email or password");
			}
			return commonErrorHandler(e, "email");
		}
	};
</script>

<div>
	<ModalBase>
		<form class="main flex flex-col items-center" on:submit|preventDefault={handleLogin}>
			<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mb-12" />
			<h3 class="text-2xl font-bold">Login to String’s Developer Dashboard</h3>
			<p class="my-8"></p>
			<StyledInput
				className="w-full"
				type="email"
				label="Email"
				autocomplete="username"
				placeholder="Enter email"
				bind:val={emailInput}
				borderError={!isEmailValid && emailInput !== ""}
				autofocus
				required
			/>
			{#if !isEmailValid && emailInput !== ""}
				<p class="text-error mt-2 mb-4 mr-auto">Invalid email address</p>
			{:else}
				<div class="mb-6" />
			{/if}

			<StyledInput
				className="mb-2 w-full"
				label="Password"
				type="password"
				autocomplete="current-password"
				placeholder="********"
				bind:val={pwdInput}
				required
			/>
			<!-- Add visibility icon and allow to show and hide pwd -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p on:click={() => ($activeModal = ForgotPassword)} class="text-sm cursor-pointer mb-8 ml-auto">Forgot password?</p>
			<StyledButton className="w-full mb-6" type="submit" {disabled}>Login</StyledButton>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="mt-4"
				>New to String?
				<span on:click={() => ($activeModal = CreateAccount)} class="link link-primary">Create an account </span>
			</span>
		</form>
	</ModalBase>
</div>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
		padding-top: 50px;
		padding-bottom: 32px;
	}
</style>
