<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";
	import StatusLabel from "./StatusLabel.svelte";
	import KeyDropdown from "./KeyDropdown.svelte";

	import { ErrorCode, keyService, platformService } from "$lib/services";
	import { apiKeyList, createdApiKey, selectedKey, keyCreateModalOpen, toast } from "$lib/stores";
	import { commonErrorHandler, type ApiKey } from "$lib/common";

	let descInput: string;

	// This is to allow the default value to be the key's current description
	selectedKey.subscribe((key) => (descInput = key?.description ?? ""));

	const createApiKey = async () => {
		if (!$keyCreateModalOpen) {
			const newApiKey = await keyService.createApiKey();

			$createdApiKey = newApiKey;
			$keyCreateModalOpen = true;

			$apiKeyList = await keyService.listApiKeys();
		} else {
			$keyCreateModalOpen = false;
		}
	};

	const updateDescription = async (keyid: string, keyIdx: number, description: string) => {
		try {
			const updatedKey = await keyService.editApiKey(keyid, description);
			$selectedKey = null;
			$apiKeyList[keyIdx] = updatedKey;
			descInput = "";

			$toast.show("success", "Description updated");
		} catch (e: any) {
			if (e.code == ErrorCode.BAD_REQUEST) {
				return $toast.show("error", "Description must be between 0 and 144 characters");
			}
			return commonErrorHandler(e, "API Key");
		}
	};

	const getPlatformName = async (key: ApiKey) => {
		const platform = await platformService.getPlatform(key.platformId);
		return platform.name;
	}

	const cancelEdit = () => {
		$selectedKey = null;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($selectedKey) {
			if (e.key == "Enter") {
				updateDescription($selectedKey.id, $apiKeyList.indexOf($selectedKey), descInput);
			} else if (e.key == "Escape") {
				cancelEdit();
			}
		}
	};

</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

{#if $apiKeyList?.length > 0}
	<div class="keys w-full mb-7">
		<div class="flex flex-nowrap py-4 pl-4 pr-6 gap-x-5 font-bold">
			<p class="col">Key</p>
			<p class="col">Game</p>
			<p class="col mr-2">Description</p>
			<p class="col">Status</p>
			<p class="col" />
		</div>
		<div class="rows">
			{#each $apiKeyList as key, i}
				<div class="row flex flex-nowrap items-center py-6 pl-4 pr-6 gap-x-5">
					<div class="col flex flex-col">
						<p class="font-bold">{key.hint}</p>
						<span class="text-sm">
							{#if key.showFullKey}
								<span class="select-all text-clip break-all">{key.data}</span>
								<button on:click={() => (key.showFullKey = !key.showFullKey)}>
									<img src="/assets/dropdown/eye_con_hide.svg" alt="view" class="inline mx-2" />
								</button>
							{:else}
								<button on:click={() => (key.showFullKey = !key.showFullKey)}>
									View entire key
									<img src="/assets/dropdown/eye_con.svg" alt="view" class="inline mx-2" />
								</button>
							{/if}
						</span>
					</div>
					<div class="col">
						{#await getPlatformName(key) then platformName}
							<p class="text-sm font-medium">{platformName}</p>
						{/await}
					</div>
					<div class="col">
						{#if key == $selectedKey}
							<StyledInput className="mb-1" label="Description" placeholder="Optional. Max 144 chars" bind:val={descInput} autofocus={true} />
						{:else}
							<p class="break-all text-sm font-medium select-text">{key.description ?? ""}</p>
						{/if}
					</div>
					<div class="col">
						{#if key !== $selectedKey}
							<StatusLabel {key} />
						{/if}
					</div>
					<div class="col flex items-center justify-end info">
						{#if key == $selectedKey}
							<button class="uppercase text-sm font-bold tracking-wider mr-6" on:click={cancelEdit}>Cancel</button>

							<StyledButton className="rounded-3xl px-6" action={() => updateDescription(key.id, i, descInput)}>Save</StyledButton>
						{:else}
							<p class="text-xs mr-4 font-medium tabular-nums">Created on {key.createdAt}</p>
							{#if !key.deletedAt}
								<KeyDropdown {key} />
							{/if}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center">
		<img src="/assets/card/key_icon.svg" alt="key" width="75px" height="75px" />
		<h6 class="font-bold my-9 text-center">You haven’t created any API keys yet. Create a key now.</h6>
		<StyledButton className="btn-wide" action={createApiKey}>Create a Key</StyledButton>
	</div>
{/if}

<style>
	.col {
		width: 20%;
	}

	.row {
		border-top: 1px solid #f2f2f2;
	}

	.keys {
		border: 1px solid #f2f2f2;
		border-radius: 4px;
		/* This will make the bottom row be too tall, but also solves right hand going off screen */
		/* overflow-x: hidden; */
	}

	@media (max-width: 900px) {
		.row {
			flex-direction: column;
			row-gap: 20px;
			justify-content: center;
			text-align: center;
		}

		.info {
			white-space: nowrap;
			flex-direction: column;
			row-gap: 10px;
		}
	}
</style>
