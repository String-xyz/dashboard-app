<script lang="ts">
	import { currentUser } from "$lib/stores";
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";

	let nameInput = $currentUser.name;

	const showEdit = () => {
		isEditingName = true;
	}

	const saveEdit = () => {
		isEditingName = false;
	}

	const cancelEdit = () => {
		isEditingName = false;
	}

	$: isEditingName = false;

</script>

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6">Account Details</h6>

	<div class="flex flex-row items-center ">
		<div class="pl-5 mr-6 w-1/3">
			{#if isEditingName}
				<StyledInput label="Your Name" bind:val={nameInput} autofocus />
			{:else}
				<span class="mb-2 font-medium text-sm">
					<img src="/assets/label/name.svg" alt="name" class="mr-1 inline" />
					Your Name
				</span>
				<p class="select-all">{$currentUser.name}</p>
			{/if}
		</div>
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/email.svg" alt="email" class="mr-1 inline" />
				Account Email
			</span>
			<p class="select-all">{$currentUser.email}</p>
		</div>
		<div class="pl-5 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/permissions.svg" alt="permissions" class="mr-1 inline" />
				Your Permissions
			</span>
			<p class="select-all">{$currentUser.role}</p>
		</div>
	</div>
	{#if isEditingName}
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
</div>