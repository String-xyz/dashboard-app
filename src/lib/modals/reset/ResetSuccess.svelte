<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import Login from '../login/Login.svelte';

	import { activeModal } from '$lib/stores';

	const backToLogin = () => {
		$activeModal = Login;
	}

</script>

<ModalBase size="size-sm">
	<div class="main flex flex-col justify-center items-center w-full h-full">
		<img src="/assets/indicator/success.svg" alt="Success" class="mb-8" />

		<h3 class="text-2xl font-bold mb-8">Password reset</h3>
		<p>Your password has been successfully reset.</p>
		<p class="mb-10">Click below to log in.</p>

		<StyledButton className="mb-8 w-full" action={backToLogin}>Back to log in</StyledButton>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 60px;
		padding-right: 60px;
	}
</style>
