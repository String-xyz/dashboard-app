<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import ForgotPassword from './ForgotPassword.svelte';

	import { activeModal, user } from '$lib/stores';

	const back = () => {
		$activeModal = ForgotPassword;
	}

	const handleResend = () => {
	}
	
</script>

<ModalBase size="size-md">
	<div class="flex flex-col justify-center items-center w-full h-full">
		<img src="/assets/email_icon.svg" alt="Email" class="mb-8" />

		<h3 class="text-2xl font-bold mb-2">Check your email</h3>
		<p class="">We sent a password reset link to</p>
		<p class="mb-10 font-semibold">{$user.email}</p>

		<div class="flex items-center">
			<StyledButton className="btn-outline w-40 mr-6" action={back}>
				<img src="/assets/button/left_chevron.svg" alt="<" class="mr-3" />
				Go Back
			</StyledButton>
			<StyledButton className="w-40" action={handleResend}>Resend</StyledButton>
		</div>
	</div>
</ModalBase>
