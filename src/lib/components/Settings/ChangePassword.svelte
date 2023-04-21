<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";

	import { toast } from "$lib/stores";
	import { validator } from "$lib/utils";
	import { apiClient, ErrorCode } from "$lib/services";
	import { commonErrorHandler } from "$lib/common/errors";

	let oldPwdInput: string;
	let newPwdInput: string;

	$: isPwdValid = validator.isValidPwd(newPwdInput);

	$: disabled = !isPwdValid;

	const changePassword = async () => {
		try {
			if (!isPwdValid) return;

			await apiClient.changeSelfPassword(oldPwdInput, newPwdInput);

			// clear inputs
			oldPwdInput = "";
			newPwdInput = "";

			$toast.show("success", "Password changed");
		} catch (e: any) {
			if (e.code === ErrorCode.BAD_REQUEST) {
				return $toast.show("error", "Incorrect old password");
			}
			return commonErrorHandler(e, "old password");
		}
	};
</script>

<form on:submit={changePassword} class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6 text-lg">Change Password</h6>

	<div class="flex w-3/4 items-start">
		<!-- Silence a11y warning -->
		<input autocomplete="username" hidden class="hidden" />
		<StyledInput
			label="Old Password"
			type="password"
			autocomplete="current-password"
			placeholder="********"
			className="w-full mr-6"
			bind:val={oldPwdInput}
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
				bind:val={newPwdInput}
				required
			/>
			<span class="mt-2 whitespace-nowrap text-sm flex items-center">
				<img src="/assets/info.svg" alt="info" class="mr-1 inline" />
				Must be at least 8 characters
			</span>
		</div>
	</div>
	<StyledButton className="ml-auto mt-24" type="submit" {disabled}>Change Password</StyledButton>
</form>
