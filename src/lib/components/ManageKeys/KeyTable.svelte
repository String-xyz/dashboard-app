<script lang="ts">
	import StyledButton from '../StyledButton.svelte';
	import StyledInput from '../StyledInput.svelte';
	import StatusLabel from './StatusLabel.svelte';
	import KeyDropdown from './KeyDropdown.svelte';

	import { keyService } from '$lib/services';
	import { apiKeyList, createdApiKey, editKey, keySuccessModalOpen } from '$lib/stores'

	let descInput: string;

	// This is to allow the default value to be the key's current description
	editKey.subscribe((key) => descInput = key?.description ?? "");

	const createApiKey = async () => {
		// Create API Key in keys service and add it to apiKeyList
		const newApiKey = await keyService.createApiKey();

		$createdApiKey = newApiKey;
		$keySuccessModalOpen = true;

		$apiKeyList = await keyService.listApiKeys();
	}

	const updateDescription = async (keyid: string, keyIdx: number, description: string) => {
		const updatedKey = await keyService.editApiKey(keyid, description);

		$apiKeyList[keyIdx] = updatedKey;
		$editKey = null;
		descInput = "";
	}

	const cancelEdit = () => {
		$editKey = null;
	}

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($editKey) {
			if (e.key == "Enter") {
				updateDescription($editKey.id, $apiKeyList.indexOf($editKey), descInput);
			} else if (e.key == "Escape") {
				cancelEdit();
			}
		}
	}

	const truncate = (key: string) => {
		return key.slice(0, 10)
	}

</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

{#if $apiKeyList?.length > 0}
	<div class="keys w-full mb-7">
		<div class="flex py-4 pl-4 pr-9 font-bold flex-nowrap">
			<p class="!w-1/4">Key</p>
			<p class="w-1/4">Description</p>
			<p class="w-1/4 ml-5">Status</p>
		</div>
		<div class="rows">
			{#each $apiKeyList as key, i}
				<div class="row flex flex-nowrap items-center py-6 pl-4 pr-9">
					<div class="!w-1/4">
						<p class="font-bold">{truncate(key.data)}</p>
						<span class="text-sm whitespace-nowrap">
							{#if key.showFullKey}
								<span class="select-all">{key.data}</span>
								<button on:click={() => key.showFullKey = !key.showFullKey}>
									<img src="/assets/dropdown/eye_con_hide.svg" alt="view" class="inline mx-2" />
								</button>
							{:else}
								<button on:click={() => key.showFullKey = !key.showFullKey}>
									View entire key
									<img src="/assets/dropdown/eye_con.svg" alt="view" class="inline mx-2" />
								</button>
							{/if}
						</span>
					</div>
					<div class="w-1/4">
						{#if $editKey == key}
							<StyledInput
								className="mb-1"
								label="Description"
								placeholder="Optional"
								bind:val={descInput}
								autofocus={true}
							/>
						{:else}
							<p class="truncate" title={key.description ?? ""}>{key.description ?? ""}</p>
						{/if}
					</div>
					<div class="w-1/4 ml-5">
						{#if $editKey !== key}
							<StatusLabel {key} />
						{/if}
					</div>
					<div class="flex justify-items-start items-center ml-auto">
						{#if $editKey == key}
							<button
								class="uppercase text-sm font-bold tracking-wider mr-6"
								on:click={cancelEdit}
							>
								Cancel
							</button>

							<StyledButton
								className="rounded-3xl px-6"
								action={() => updateDescription(key.id, i, descInput)}
							>
								Save
							</StyledButton>
						{:else}
							<p class="text-xs mr-4">Created on {key.createdAt}</p>
							<KeyDropdown {key} />
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
		<StyledButton className="btn-wide" action={createApiKey}>
			Create a Key
		</StyledButton>
	</div>
{/if}

<style>
	.row {
		border-top: 1px solid #F2F2F2;
	}

	.rows:first-child {
		border-top: 2px solid red !important;
	}

	.keys {
		border: 2px solid #F2F2F2;
		border-radius: 4px;
	}

</style>