<script lang="ts">
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import { keySuccessModalOpen, createdApiKey, apiKeyList, toast } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common/errors";
	import { keyService } from "$lib/services";
	import { copyText } from "$lib/utils";

	let descInput: string;

	const saveDescription = async () => {
		$toast.show("success", "Key created");

		if (!descInput || !$createdApiKey) return;

		try {
			await keyService.editApiKey($createdApiKey.id, descInput);
			$toast.show("success", "Description updated");
		} catch (e: any) {
			return commonErrorHandler(e, "API Key");
		}
	};

	const close = async () => {
		await saveDescription();
		descInput = "";

		$apiKeyList = await keyService.listApiKeys();
		$keySuccessModalOpen = false;
		$createdApiKey = null;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($keySuccessModalOpen) {
			if (e.key == "Escape" || e.key == "Enter") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="key-success-modal" class="modal-toggle" bind:checked={$keySuccessModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={close} class="main flex flex-col items-center w-full pr-6 pt-2">
				<img src="/assets/indicator/success.svg" alt="success" class="mb-8" />
				<h3 class="text-3xl font-bold mb-12">Success!</h3>

				<p class="text-center">Your API key is ready for action. Time to start building and integrating!</p>

				<div class="flex items-center border border-[#E6E4DF] rounded-xl my-8 py-4 px-3">
					<span>{$createdApiKey?.data ?? ""}</span>
					<button class="ml-6" on:click|preventDefault={() => copyText($createdApiKey?.data)}>
						<img src="/assets/dropdown/copy.svg" alt="copy" />
					</button>
				</div>
				{#if $keySuccessModalOpen}
					<StyledInput
						className="mb-8 w-full"
						label="Description"
						placeholder="Optional"
						bind:val={descInput}
						autofocus 
					/>
				{/if}
				<StyledButton className="w-full" type="submit">Complete</StyledButton>
			</form>
		</div>
	</div>
</div>

<style>
	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 60px;
		padding-right: 36px;
		padding-top: 36px;
		border-radius: 8px;
		width: 600px;
		max-width: 600px;
		height: 600px;
	}
</style>
