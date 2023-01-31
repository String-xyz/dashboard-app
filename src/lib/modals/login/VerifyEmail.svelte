<script lang='ts'>
	import ModalBase from "../ModalBase.svelte";

	import { activeModal } from "$lib/stores";
	import CreateAccount from "./CreateAccount.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	const back = () => {
		$activeModal = CreateAccount;
	}

	const resend = () => {

	}
	
</script>

<ModalBase>
	<div class='flex flex-col justify-center items-center w-full h-full'>
		<img src='/assets/email_icon.svg' alt='Email' class="mb-12" />

		<h3 class="text-2xl font-bold">Check your email...</h3>
		<p class="my-8">We’ve sent a verification email to john@email.com</p>
		<div class="flex items-center mt-8">
			<StyledButton className="btn-outline w-40 mr-6" action={back}>
				<img src="/assets/button/left_chevron.svg" alt="<" class="mr-3" />
				Go Back
			</StyledButton>
			<StyledButton className="w-40" action={resend}>Resend</StyledButton>
		</div>
		<img src='/assets/string_logo.svg' alt='String' width="76px" height="18px" class="mt-12" />

	</div>
</ModalBase>