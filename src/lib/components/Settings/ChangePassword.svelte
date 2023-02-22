<script lang="ts">
	import { currentUser } from "$lib/stores";
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";

	let oldPasswordInput: string;
	let newPasswordInput: string;

	const changePassword = () => {
		console.log("hello", newPasswordInput)
	}

</script>

<form on:submit={changePassword} class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6 text-lg">Change Password</h6>

	<div class="flex w-3/4 items-start">
		<StyledInput
			label="Old Password"
			type="password"
			autocomplete="current-password"
			placeholder="********"
			className="w-full mr-6"
			bind:val={oldPasswordInput}
			autofocus
			required
		/>
		<div class="w-full">
			<StyledInput
				label="New Password"
				type="password" 
				autocomplete="new-password"
				placeholder="********"
				className="w-full"
				bind:val={newPasswordInput}
				required
			/>
			<span class="mt-2 whitespace-nowrap text-sm flex items-center">
				<img src="/assets/info.svg" alt="info" class="mr-1 inline" />
				Must be at least 8 characters
			</span>
		</div>
	</div>
	<StyledButton className="ml-auto mt-24" type="submit">Change Password</StyledButton>
</form>