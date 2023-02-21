<script lang="ts">
	import { authService } from "$lib/services";
	import { currentUser } from "$lib/stores";
	import { Role } from "$lib/types";
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";


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

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6">Platform Details</h6>

	<div class="flex flex-row items-center ">
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/email.svg" alt="email" class="mr-1 inline" />
				Business Email
			</span>
			<p class="select-all">mock@email.com</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/name.svg" alt="name" class="mr-1 inline" />
				Owner's Name
			</span>
			<p class="select-all">Mock Name</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			{#if isEditing}
				<StyledInput label="Company" bind:val={companyNameInput} autofocus />
			{:else}
				<span class="mb-2 font-medium text-sm">
					<img src="/assets/label/company.svg" alt="company" class="mr-1 inline" />
					Company
				</span>
				<p class="select-all">Mock Inc</p>
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
				<p class="select-all">mock.com</p>
			{/if}
		</div>
	</div>
	{#if authService.canView($currentUser.role, Role.ADMIN)}
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