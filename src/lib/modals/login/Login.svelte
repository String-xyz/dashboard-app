<script lang='ts'>
	import ModalBase from "../ModalBase.svelte";
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import ForgotPassword from "../reset/ForgotPassword.svelte";
	import CreateAccount from "./CreateAccount.svelte";
	import LoginSuccess from "./LoginSuccess.svelte";

	import { activeModal } from "$lib/stores";
	import { z } from 'zod';

	let emailInput: string;
	let pwdInput: string;

	const emailSchema = z.string().trim().email();
	const passwordSchema = z.string().min(8);

	let isEmailValid = false;
	let isPassValid = false;

	$: disabled = false;

</script>

<ModalBase>
	<div class='main flex flex-col items-center'>
		<img src='/assets/string_logo.svg' alt='String' width="76px" height="18px" class="mb-12" />
		<h3 class="text-2xl font-bold">Login to String’s Developer dashboard</h3>
		<p class="my-8">Unlock the magic of String’s API by entering your email below.</p>
		<StyledInput className="mb-6 w-full" label="Email" placeholder="Enter email" bind:value={emailInput} autofocus />
		<StyledInput className="mb-2 w-full" type='password' label="Password" placeholder="********" bind:value={pwdInput} />
		<!-- Add visibility icon and allow to show and hide pwd -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<p on:click={() => $activeModal = ForgotPassword} class="text-sm cursor-pointer mb-8 ml-auto">Forgot password?</p>
		<StyledButton className="w-full" {disabled} action={() => $activeModal = LoginSuccess}>Login</StyledButton>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span class="mt-4">New to String? <span on:click={() => $activeModal = CreateAccount} class="link link-primary">Create an account</span></span>
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