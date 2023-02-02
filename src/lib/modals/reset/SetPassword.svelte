<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import Login from '../login/Login.svelte';
	import ResetSuccess from './ResetSuccess.svelte';
	import ResetFailed from './ResetFailed.svelte';

	import { activeModal } from '$lib/stores';

	let pwdInput: string;

	// Set to true for testing, will be behind Zod parsing
	let isPwdValid = true;

	$: disabled = !isPwdValid;

	const handleReset = () => {
		$activeModal = ResetSuccess;
	};

	const backToLogin = () => {
		$activeModal = Login;
	};
</script>

<ModalBase size="size-xl">
	<div class="main flex flex-col items-center">
		<img src="/assets/auth_key_icon.svg" alt="Key" class="mb-8" />
		<h3 class="text-2xl font-bold mb-2">Set new password</h3>
		<p class="text-center mb-8">Your new password must be different to previously used passwords</p>

		<StyledInput
			className="mb-2 w-full"
			type="password"
			label="Password"
			placeholder="********"
			bind:val={pwdInput}
			autofocus
		/>

		<p class="mb-8 text-sm mr-auto">Must be at least 8 characters</p>

		<StyledInput
			className="mb-8 w-full"
			type="password"
			label="Confirm password"
			placeholder="********"
			bind:val={pwdInput}
		/>

		<StyledButton className="mb-8 w-full" action={handleReset} {disabled}
			>Reset password</StyledButton
		>

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
		padding-top: 52px;
	}
</style>
