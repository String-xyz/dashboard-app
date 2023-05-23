<script lang="ts">
	import { commonErrorHandler } from "$lib/common";
	import { platformService } from "$lib/services";
	import { platformEditModalOpen, platformList, selectedPlatform, toast } from "$lib/stores";

	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	let nameInput = $selectedPlatform?.name || "";
	let descInput = $selectedPlatform?.description || "";

	// This is to allow the default values to be platform's values
	selectedPlatform.subscribe((platform) => (nameInput = platform?.name ?? ""));
	selectedPlatform.subscribe((platform) => (descInput = platform?.description ?? ""));

	const editPlatform = async () => {
		try {
			if (!nameInput) {
				return $toast.show("error", "Game name cannot be empty");
			}

			if (descInput == $selectedPlatform.description) {
				close();
				return;
			}

			if (descInput.length > 144) {
				return $toast.show("error", "Description must be between 0 and 144 characters");
			}

			await platformService.updatePlatform($selectedPlatform.id, nameInput, descInput);
			$platformList = await platformService.listPlatforms();

			close();
			$toast.show("success", "Description updated");
		} catch (err: any) {
			commonErrorHandler(err, "Game");
		}
	};

	const close = () => {
		$platformEditModalOpen = false;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($platformEditModalOpen) {
			if (e.key == "Enter") {
				editPlatform();
			}
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="platform-edit-modal" class="modal-toggle" bind:checked={$platformEditModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={editPlatform} class="main flex flex-col items-center w-full pr-6 pt-2">
				<img src="/assets/card/platform_icon.svg" alt="game" class="mb-8" />
				<h3 class="text-3xl font-bold mb-12">Edit Game</h3>

				<StyledInput
					className="mb-8 w-full"
					label="Game name"
					placeholder="Game"
					bind:val={nameInput}
					autofocus 
				/>
				<StyledInput
					className="mb-12 w-full"
					label="Game description"
					placeholder="Optional"
					bind:val={descInput}
				/>
				<StyledButton className="w-full" type="submit">Update</StyledButton>
			</form>
		</div>
	</div>
</div>

<style>
	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 60px;
		padding-right: 36px;
		padding-top: 36px;
		border-radius: 8px;
		width: 600px;
		max-width: 600px;
		height: 550px;
	}
</style>
