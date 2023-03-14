<script lang="ts">
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import RoleDropdown from "$lib/components/ManageTeam/RoleDropdown.svelte";

	import { Role } from "$lib/types";
	import { validator } from "$lib/utils";
	import { apiClient, teamService } from "$lib/services";
	import { inviteModalOpen, teamItems, toast } from "$lib/stores";

	let dropdownOpen: boolean;
	let inviteRole: Role;

	let emailInput: string;
	let nameInput: string;

	$: isEmailValid = validator.isValidEmail(emailInput);
	$: isNameValid = validator.isValidName(nameInput);

	$: disabled = !isEmailValid || !isNameValid;

	const handleInvite = async () => {
		if (disabled) return;

		try {
			emailInput = validator.normalizeEmail(emailInput);
			await apiClient.sendInvite(emailInput, nameInput, inviteRole);

			$teamItems = await teamService.rebuildTeamList();

			// clear inputs
			emailInput = "";
			nameInput = "";
			inviteRole = Role.MEMBER;

			$toast.show("success", "Invite sent!");
		} catch (e: any) {
			console.error("code", e.code);

			if (e.code === "CONFLICT") return $toast.show("error", "This email is already in use.");

			$toast.show("error", "Oops, something went wrong. Please try again.");
		}

		$inviteModalOpen = false;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($inviteModalOpen) {
			if (e.key == "Escape") {
				close();
			}
			if (e.key == "Enter") {
				handleInvite();
			}
		}
	};

	const close = () => {
		$inviteModalOpen = false;
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="invite-modal" class="modal-toggle" bind:checked={$inviteModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="main flex flex-col items-center w-full">
			<button class="ml-auto mb-1" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<h3 class="text-3xl font-bold mb-12">Invite a teammate</h3>

			<StyledInput
				className="mb-6 w-full"
				type="email"
				label="Email address"
				placeholder="test@string.xyz"
				borderError={!isEmailValid && emailInput !== ""}
				bind:val={emailInput}
				autofocus
				required
			/>
			<div class="flex justify-between mb-20 w-full">
				<StyledInput className="mb-2 w-full mr-6" label="Full name" placeholder="John Smith" bind:val={nameInput} required />
				<StyledInput label="Role" className="flex justify-center w-48 h-[54px]" wrapper={true} focused={dropdownOpen}>
					<RoleDropdown isForInvite={true} bind:dropdownOpen bind:activeRole={inviteRole} />
				</StyledInput>
			</div>
			<StyledButton className="w-full" action={handleInvite} {disabled}>
				<img src="/assets/button/send_mail.svg" alt="send" class="mr-3" />
				Send Invite
			</StyledButton>
		</div>
	</div>
</div>

<style>
	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 36px;
		padding-right: 36px;
		padding-top: 36px;
		border-radius: 8px;
		width: 500px;
		height: 450px;
	}
</style>
