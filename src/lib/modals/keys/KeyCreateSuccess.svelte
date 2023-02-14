<script lang="ts">
	import StyledInput from '$lib/components/StyledInput.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';

	import { keySuccessModalOpen } from '$lib/stores';
	import { apiClient } from '$lib/services';

	const saveDescription = () => {
		// editApiKey
	}

	const close = () => {
		saveDescription();
		$keySuccessModalOpen = !$keySuccessModalOpen;
	}

</script>

<input type="checkbox" id="key-success-modal" class="modal-toggle" bind:checked={$keySuccessModalOpen} />

<label for="key-success-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="main flex flex-col items-center w-full">
			<button class="ml-auto mb-1" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<h3 class="text-3xl font-bold mb-12">Invite a teammate</h3>

			<StyledInput
				className="mb-6 w-full"
				type='email'
				label="Email address"
				placeholder="test@string.xyz"
				bind:val={emailInput}
				autofocus
				required
			/>
			<div class="flex justify-between mb-20 w-full">
				<StyledInput
					className="mb-2 w-full mr-6"
					label="Full name"
					placeholder="John Smith"
					bind:val={nameInput}
					required
				/>
				<StyledInput
					label="Role"
					className="flex justify-center w-48 h-[54px]"
					wrapper={true}
					focused={dropdownOpen}
				>
				</StyledInput>
			</div>
			<StyledButton className="w-full" action={close}>
				Complete
			</StyledButton>
		</div>
	</label>
</label>

<style>
	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 36px;
		padding-right: 36px;
		padding-top: 36px;
		border-radius: 8px;
		width: 600px;
		height: 450px;
	}

</style>