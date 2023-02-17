<script lang="ts">
	import StyledButton from '../StyledButton.svelte';
	import StatusLabel from './StatusLabel.svelte';

	import { keyService, type ApiKeyResponse } from '$lib/services';
	import { apiKeyList, createdApiKey, keySuccessModalOpen } from '$lib/stores'
	import KeyDropdown from './KeyDropdown.svelte';

	const createApiKey = async () => {
		// Create API Key in keys service and add it to apiKeyList
		const newApiKey = await keyService.createApiKey();
		$createdApiKey = newApiKey;
		$apiKeyList.push(newApiKey);
		$keySuccessModalOpen = !$keySuccessModalOpen;
	}

	const truncate = (key: string) => {
		return key.slice(0, 10)
	}

	const fakeDesc = "akfdsfdsfkdgflgdfklgdfjgfgkfglksfkgklsflkdsfdsjklfdlkkl"

	const showFullKey = new Map<string, boolean>();

</script>
{#if $apiKeyList?.length > 0}
	<div class="keys w-full">
		<div class="flex py-4 font-bold flex-nowrap">
			<p class="w-1/4 pl-4">Key</p>
			<p class="w-1/4">Description</p>
			<p class="w-1/4 ml-5">Status</p>
		</div>
		<div class="rows">
			{#each $apiKeyList as key, i}
				<div class="row flex flex-nowrap items-center py-6 pl-4 pr-9">
					<div class="w-1/4">
						<p class="font-bold">{truncate(key.data)}</p>
						<span class="text-sm whitespace-nowrap">
							{#if key.showFullKey}
								<span class="select-all">{key.data}</span>
								<button on:click={() => key.showFullKey = !key.showFullKey}>
									<img src="/assets/dropdown/eye_con_hide.svg" alt="view" class="inline ml-2" />
								</button>
							{:else}
								View entire key
								<button on:click={() => key.showFullKey = !key.showFullKey}>
									<img src="/assets/dropdown/eye_con.svg" alt="view" class="inline ml-2" />
								</button>
							{/if}
						</span>
					</div>
					<div class="w-1/4">
						<p class="truncate" title={fakeDesc}></p>
					</div>
					<div class="w-1/4 ml-5">
						<StatusLabel {key} />
					</div>
					<div class="flex justify-items-start ml-auto">
						<p class="text-xs mr-6">Created on {key.createdAt}</p>
						<KeyDropdown />
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
	.col {
		width: 25%;
	}

	.row {
		border-top: 1px solid #F2F2F2;
	}

	.rows:first-child {
		border-top: 2px solid red !important;
	}

	.greyed {
		color: #BEBCBA;
	}

	.keys {
		border: 2px solid #F2F2F2;
		border-radius: 4px;
	}

</style>