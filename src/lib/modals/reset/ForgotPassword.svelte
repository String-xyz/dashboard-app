<script lang="ts">
	import ModalBase from "../ModalBase.svelte";
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import PwdResetEmail from "./PwdResetEmail.svelte";
	import Login from "../login/Login.svelte";

	import { activeModal, loginEmail } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common/errors";
	import { apiClient } from "$lib/services";
	import { validator } from "$lib/utils";

	let emailInput: string;

	$: isEmailValid = validator.isValidPwd(emailInput);
	$: disabled = !isEmailValid;

	const reset = async () => {
		try {
			emailInput = validator.normalizeEmail(emailInput);
			await apiClient.sendResetPasswordToken(emailInput);

			$loginEmail = emailInput;
			$activeModal = PwdResetEmail;
		} catch (e: any) {
			return commonErrorHandler(e, "user");
		}
	};

	const backToLogin = () => {
		$activeModal = Login;
	};
</script>

<ModalBase size="size-md">
	<form on:submit={reset} class="main flex flex-col items-center">
		<img src="/assets/auth_key_icon.svg" alt="Key" class="mb-8" />
		<h3 class="text-2xl font-bold mb-2">Forgot password?</h3>
		<p class="mb-8">No worries, we’ll send you reset instructions</p>

		<StyledInput
			className="mb-8 w-full"
			type='email'
			label="Email"
			placeholder="Enter your email"
			autocomplete="username"
			bind:val={emailInput}
			autofocus
			required
		/>

		<StyledButton className="mb-8 w-full" type="submit" {disabled}>Reset password</StyledButton>

		<button on:click={backToLogin}>
			<span>
				<img src="/assets/button/left_arrow.svg" alt="<-" class="mr-2 inline" />
				Back to log in
			</span>
		</button>
	</form>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
		padding-top: 70px;
	}
</style>
