<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";
	
	import { currentUser, platform } from "$lib/stores";
	import { Role } from "$lib/types";
	import { KYB_URL } from "$lib/config";
	import { openLink } from "$lib/utils";

	let companyNameInput: string;
	let websiteURLInput: string;

	const showEdit = () => {
		isEditing = true;
	}

	const saveEdit = () => {
		isEditing = false;
	}

	const cancelEdit = () => {
		isEditing = false;
	}

	$: isEditing = false;

</script>

{#if $currentUser.role == Role.OWNER && !$platform.isVerified}
	<div class="flex justify-between items-center mb-7 p-4 verifiedCta">
		<span class="text-sm">
			<img src="/assets/info.svg" alt="info" class="mr-2 inline" />
			Your platform is not yet verified. To unlock String’s full API capabilities, please verify your platform.
		</span>

		<StyledButton className="btn-outline" action={() => openLink(KYB_URL)}>
			Get Verified
		</StyledButton>
	</div>
{/if}

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6 text-lg">Platform Details</h6>

	<div class="flex items-center ">
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/email.svg" alt="email" class="mr-1 inline" />
				Business Email
			</span>
			<p class="select-all">{$platform.ownerEmail}</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/name.svg" alt="name" class="mr-1 inline" />
				Owner's Name
			</span>
			<p class="select-all">{$platform.ownerName}</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			{#if isEditing}
				<StyledInput label="Company" bind:val={companyNameInput} autofocus />
			{:else}
				<span class="mb-2 font-medium text-sm">
					<img src="/assets/label/company.svg" alt="company" class="mr-1 inline" />
					Company
				</span>
				<p class="select-all">{$platform.name}</p>
			{/if}
		</div>
		<div class="pl-5 w-1/3">
			{#if isEditing}
				<StyledInput label="Website URL" bind:val={websiteURLInput} />
			{:else}
				<span class="mb-2 font-medium text-sm">
					<img src="/assets/label/url.svg" alt="url" class="mr-1 inline" />
					Website URL
				</span>
				<p class="select-all">{$platform.domain}</p>
			{/if}
		</div>
	</div>
	{#if $currentUser.role == Role.OWNER}
		{#if isEditing}
			<div class="ml-auto mt-24">
				<button
					class="uppercase text-sm font-bold tracking-wider mr-6"
					on:click={cancelEdit}
				>
				Cancel
				</button>
				<StyledButton className="w-32" action={saveEdit}>Save</StyledButton>
			</div>
		{:else}
			<StyledButton className="ml-auto mt-24 w-32" action={showEdit}>Edit</StyledButton>
		{/if}
	{/if}
</div>

<style>
	.verifiedCta {
		border-radius: 4px;
		border: 1px solid #A7C5FD;
		background-color: #F1F6FD;
	}
</style>