<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import Login from '../login/Login.svelte';
	import ResetSuccess from './ResetSuccess.svelte';
	import ResetFailed from './ResetFailed.svelte';

	import { activeModal, resetToken } from '$lib/stores';
	import { validator } from '$lib/utils';
	import { apiClient } from '$lib/services';

	let pwdInput: string;
	let confPwdInput: string;

	$: isPwdValid = validator.isValidPwd(pwdInput);

	$: disabled = !isPwdValid || pwdInput !== confPwdInput;

	const handleReset = async () => {
		if (!isPwdValid) return console.error("Invalid password");
		if (pwdInput !== confPwdInput) return console.error("Passwords do not match");

		if (!$resetToken) {
			console.error("No reset token found");
			return $activeModal = ResetFailed;
		}

		try {
			await apiClient.resetPassword($resetToken, pwdInput);
			$activeModal = ResetSuccess;
		} catch (e) {
			console.error(e);
			$activeModal = ResetFailed;
		}
	};

	const backToLogin = () => {
		$activeModal = Login;
	}

</script>

<ModalBase size="size-xl">
	<form on:submit={handleReset} class="main flex flex-col items-center">
		<img src="/assets/auth_key_icon.svg" alt="Key" class="mb-8" />
		<h3 class="text-2xl font-bold mb-11">Set new password</h3>
		<!-- <p class="text-center mb-8">Your new password must be different to previously used passwords</p> -->

		<StyledInput
			className="mb-2 w-full"
			type="password"
			label="Password"
			autocomplete="new-password"
			placeholder="********"
			bind:val={pwdInput}
			autofocus
			required
		/>

		<p class="mb-8 text-sm mr-auto">Must be at least 8 characters</p>

		<StyledInput
			className="mb-12 w-full"
			type="password"
			label="Confirm Password"
			placeholder="********"
			bind:val={confPwdInput}
			required
		/>

		<StyledButton className="mb-8 w-full" type="submit" {disabled}
			>Reset password</StyledButton
		>

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
		padding-top: 52px;
	}

</style>
