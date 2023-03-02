<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";

	import { currentUser } from "$lib/stores";
	import { apiClient } from "$lib/services";

	let nameInput = $currentUser.name;

	$: isEditingName = false;

	const showEdit = () => {
		isEditingName = true;
	}

	const saveEdit = async () => {
		isEditingName = false;
		try {
			const member = await apiClient.changeSelfName(nameInput);
			$currentUser.name = member.name;
			// TODO: Show success message
		} catch (error) {
			console.log(error);
			// TODO: show error message
		}
	}

	const cancelEdit = () => {
		isEditingName = false;
	}

	const handleKeyboard = (e: KeyboardEvent) => {
		if (isEditingName) {
			if (e.key == "Enter") {
				saveEdit();
			} else if (e.key == "Escape") {
				cancelEdit();
			}
		}
	}

</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6 text-lg">Account Details</h6>

	<div class="flex items-center ">
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