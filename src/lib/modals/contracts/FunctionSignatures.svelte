<script lang="ts">
	import { contractFunctionsModalOpen, selectedContract } from "$lib/stores";

	const close = () => {
		$contractFunctionsModalOpen = false;
		$selectedContract = null;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($contractFunctionsModalOpen) {
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="contract-functions-modal" class="modal-toggle" bind:checked={$contractFunctionsModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex justify-between">
			<h1 class="text-2xl font-bold">Function signatures</h1>
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
		</div>
		<div class="divider" />
		<div class="flex gap-x-2 overflow-y-scroll">
			{#if $selectedContract}
				{#each $selectedContract.functions as func}
					<div class="bg-info text-gray-blue-10 rounded-md px-2 py-1 w-fit mb-1">
						<p class="select-all break-words">{func}</p>
					</div>
				{/each}			
			{/if}
		</div>
	</div>
</div>

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
		max-width: 600px;
		max-height: 600px;
	}
</style>
