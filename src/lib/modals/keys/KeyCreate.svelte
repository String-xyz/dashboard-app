<script lang="ts">
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import PlatformSelect from "$lib/components/ManagePlatforms/PlatformSelect.svelte";

	import { keyCreateModalOpen, createdApiKey, apiKeyList, toast, keySuccessModalOpen } from "$lib/stores";
	import { commonErrorHandler, type ApiKey } from "$lib/common";
	import { keyService, type Platform } from "$lib/services";

	let platform: Platform;

	let descInput: string;

	let selectedType: "public" | "secret" = "public";

	let publicSubtext = "Create a public key to integrate with our core services."

	let secretSubtext = "Create a secret key to automate managing your Organization."

	$: subtext = selectedType == "public" ? publicSubtext : secretSubtext;

	$: disabled = selectedType == "public" && !platform;

	const createKey = async () => {
		if (!platform?.id) return;

		try {
			const newApiKey = await keyService.createApiKey(platform.id, selectedType);
			await saveDescription(newApiKey);

			$createdApiKey = newApiKey;

			$apiKeyList = await keyService.listApiKeys();

			$toast.show("success", "API Key created");

			close();
			$keySuccessModalOpen = true;
		} catch (err: any) {
			commonErrorHandler(err, "API Key");
		}
	}

	const saveDescription = async (key: ApiKey) => {
		if (!descInput || !key) return;

		try {
			await keyService.editApiKey(key.id, descInput);
		} catch (e: any) {
			return commonErrorHandler(e, "API Key");
		}
	};

	const close = () => {
		$keyCreateModalOpen = false;
		selectedType = "public";
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($keyCreateModalOpen) {
			if (e.key == "Enter") {
				createKey();
			}
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="key-create-modal" class="modal-toggle" bind:checked={$keyCreateModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={createKey} class="main flex flex-col items-center w-full pr-6 pt-4">
				<img src="/assets/card/key_icon.svg" alt="key" class="mb-4" />
				<h3 class="text-2xl font-bold mb-4">Create API Key</h3>
				<p class="text-center mb-8">{subtext}</p>

				<div class="type-select flex w-full p-2 mb-8">
					<button
						class="keytype"
						class:keytype-selected={selectedType == "public"}
						on:click|preventDefault={() => selectedType = "public"}
					>
						Public
					</button>
					<button
						class="keytype"
						class:keytype-selected={selectedType == "secret"}
						on:click|preventDefault={() => selectedType = "secret"}
					>
						Secret
					</button>
				</div>
				
				<div class="box w-full p-8">
					{#if selectedType == "public"}
						<PlatformSelect bind:platform />
					{:else}
						<div class="text-sm text-center h-[50px]">
							<img src="/assets/indicator/warning.svg" alt="warning" class="inline mr-1" width="18px" height="18px" />
							Store this key somewhere safe, you will not be able to see it again after generating
						</div>
					{/if}

					<StyledInput
						className="mt-6 mb-8 w-full"
						label="Description"
						placeholder="Optional"
						bind:val={descInput}
					/>
					<StyledButton className="w-full" type="submit" {disabled}>Complete</StyledButton>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang='postcss'>
	.type-select {
		background: #F2F2F2;
		border-radius: 4px;
	}

	.keytype {
		background: #F2F2F2;
		border-radius: 4px;
		width: 50%;
		@apply py-3;
		@apply text-neutral;
		@apply text-sm;
		@apply font-bold;
		@apply tracking-wider;
		@apply uppercase;
	}

	.keytype-selected {
		background: #FFFFFF;
		@apply text-primary;
	}

	.box {
		border: 1px solid #F2F2F2;
		border-radius: 4px;
	}

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
		height: 650px;
	}
</style>
