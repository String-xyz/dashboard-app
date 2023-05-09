<script lang="ts">
	import StyledButton from "$lib/components/StyledButton.svelte";

	import { keySuccessModalOpen, createdApiKey } from "$lib/stores";
	import { copyText } from "$lib/utils";

	let showCopied = false;

	const copyKey = () => {
		copyText($createdApiKey?.data ?? "");
		showCopied = true;
		setTimeout(() => {
			showCopied = false;
		}, 1500);
	}

	const close = () => {
		$keySuccessModalOpen = false;
		$createdApiKey = null;
	}

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
				<h3 class="text-3xl font-bold mb-6">Success!</h3>

				<p class="text-center mb-5">Your API key is ready for action. Time to start building and integrating!</p>
				<div class="flex items-center border border-[#E6E4DF] rounded-lg mb-8 py-4 px-3">
					<span class="select-all">{$createdApiKey?.data ?? ""}</span>
					<button class="ml-6" on:click|preventDefault={copyKey}>
						<img src="/assets/dropdown/copy.svg" alt="copy" />
					</button>
					{#if showCopied}
						<span class="ml-2 text-sm">Copied</span>
					{/if}
				</div>

				{#if $createdApiKey?.type === "secret"}
					<div class="text-sm text-center p-2 border rounded mb-10">
						<img src="/assets/indicator/warning.svg" alt="warning" class="inline mr-1" width="18px" height="18px" />
						Store this key somewhere safe, you will not be able to see it again after generating
					</div>
				{:else}
					<span class="mb-10"></span>
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
		height: 560px;
	}
</style>
