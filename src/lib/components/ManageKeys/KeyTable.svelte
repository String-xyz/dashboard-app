<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";
	import StatusLabel from "./StatusLabel.svelte";
	import KeyDropdown from "./KeyDropdown.svelte";

	import { keyService } from "$lib/services";
	import { apiKeyList, createdApiKey, editKey, keySuccessModalOpen, toast } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common/errors";

	let descInput: string;

	// This is to allow the default value to be the key's current description
	editKey.subscribe((key) => (descInput = key?.description ?? ""));

	const createApiKey = async () => {
		if (!$keySuccessModalOpen) {
			const newApiKey = await keyService.createApiKey();

			$createdApiKey = newApiKey;
			$keySuccessModalOpen = true;

			$apiKeyList = await keyService.listApiKeys();
		} else {
			$keySuccessModalOpen = false;
		}
	};

	const updateDescription = async (keyid: string, keyIdx: number, description: string) => {
		try {
			const updatedKey = await keyService.editApiKey(keyid, description);
			$editKey = null;
			$apiKeyList[keyIdx] = updatedKey;
			descInput = "";

			$toast.show("success", "Description updated");
		} catch (e: any) {
			return commonErrorHandler(e, "API Key");
		}
	};

	const cancelEdit = () => {
		$editKey = null;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($editKey) {
			if (e.key == "Enter") {
				updateDescription($editKey.id, $apiKeyList.indexOf($editKey), descInput);
			} else if (e.key == "Escape") {
				cancelEdit();
			}
		}
	};

	const truncate = (key: string) => {
		return key.slice(0, 10);
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

{#if $apiKeyList?.length > 0}
	<div class="keys w-full mb-7">
		<div class="flex flex-nowrap py-4 pl-4 pr-9 gap-x-5 font-bold">
			<p class="col">Key</p>
			<p class="col mr-2">Description</p>
			<p class="col">Status</p>
			<p class="col" />
		</div>
		<div class="rows">
			{#each $apiKeyList as key, i}
				<div class="row flex flex-nowrap items-center gap-x-5 py-6 pl-4 pr-9">
					<div class="col flex flex-col">
						<p class="font-bold">{truncate(key.data)}</p>
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
						{#if $editKey == key}
							<StyledInput className="mb-1" label="Description" placeholder="Optional" bind:val={descInput} autofocus={true} />
						{:else}
							<p class="truncate text-sm font-medium" title={key.description ?? ""}>{key.description ?? ""}</p>
						{/if}
					</div>
					<div class="col">
						{#if $editKey !== key}
							<StatusLabel {key} />
						{/if}
					</div>
					<div class="col flex items-center justify-end">
						{#if $editKey == key}
							<button class="uppercase text-sm font-bold tracking-wider mr-6" on:click={cancelEdit}>Cancel</button>

							<StyledButton className="rounded-3xl px-6" action={() => updateDescription(key.id, i, descInput)}>Save</StyledButton>
						{:else}
							<p class="text-xs mr-4 font-medium tabular-nums">Created on {key.createdAt}</p>
							{#if !key.deactivatedAt}
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
		width: 25%;
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
</style>
