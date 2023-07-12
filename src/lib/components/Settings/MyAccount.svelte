<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";

	import { apiClient } from "$lib/services";
	import { currentUser, toast } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common";
	import { formatDate } from "$lib/utils";

	let nameInput = $currentUser.name;

	let isEditingName = false;

	const showEdit = () => {
		isEditingName = true;
	};

	const saveEdit = async () => {
		isEditingName = false;
		try {
			if (nameInput == $currentUser.name) {
				return;
			}

			const member = await apiClient.changeSelfName(nameInput);
			$currentUser.name = member.name;

			$toast.show("success", "Name changed");
		} catch (e: any) {
			return commonErrorHandler(e, "member");
		}
	};

	const cancelEdit = () => {
		isEditingName = false;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if (isEditingName) {
			if (e.key == "Enter") {
				saveEdit();
			} else if (e.key == "Escape") {
				cancelEdit();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6 text-lg">Account Details</h6>

	<div class="flex items-center ">
		<div class="pl-5 mr-6 w-1/4">
			{#if isEditingName}
				<StyledInput label="Your Name" bind:val={nameInput} autofocus />
			{:else}
				<span class="flex items-center mb-2 font-medium text-sm">
					<img src="/assets/label/name.svg" alt="name" class="mr-2 inline" />
					Your Name
				</span>
				<p class="select-all">{$currentUser.name}</p>
			{/if}
		</div>
		<div class="pl-5 mr-6 w-1/4">
			<span class="flex items-center mb-2 font-medium text-sm">
				<img src="/assets/label/email.svg" alt="email" class="mr-2 inline" />
				Account Email
			</span>
			<p class="select-all">{$currentUser.email}</p>
		</div>
		<div class="pl-5 mr-6 w-1/4">
			<span class="flex items-center mb-2 font-medium text-sm">
				<img src="/assets/label/permissions.svg" alt="permissions" class="mr-2 inline" />
				Your Permissions
			</span>
			<p class="select-all">{$currentUser.role}</p>
		</div>
		<div class="pl-5 w-1/4">
			<span class="flex items-center mb-2 font-medium text-sm">
				<img src="/assets/label/calendar.svg" alt="calendar" class="mr-2 inline" />
				Join Date
			</span>
			<p class="select-all">{formatDate($currentUser.createdAt)}</p>
		</div>
	</div>
	{#if isEditingName}
		<div class="ml-auto mt-24">
			<button class="uppercase text-sm font-bold tracking-wider mr-6" on:click={cancelEdit}>Cancel</button>
			<StyledButton className="w-32" action={saveEdit}>Save</StyledButton>
		</div>
	{:else}
		<StyledButton className="ml-auto mt-24 w-32" action={showEdit}>Edit</StyledButton>
	{/if}
</div>
