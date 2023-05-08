<script lang="ts">
	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	import { platformCreateModalOpen, platformList, toast } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common";
	import { platformService } from "$lib/services";

	let nameInput: string;
	let descInput: string;

	const createPlatform = async () => {
		try {
			if (!nameInput) {
				$toast.show("error", "Game name is required");
				return;
			}

			await platformService.createPlatform(nameInput, descInput);
			$platformList = await platformService.listPlatforms();

			close();
			$toast.show("success", "Game created");
		} catch (err: any) {
			commonErrorHandler(err, "Game");
		}
	};

	const close = () => {
		nameInput = "";
		descInput = "";

		$platformCreateModalOpen = false;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($platformCreateModalOpen) {
			if (e.key == "Enter") {
				createPlatform();
			}
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="platform-create-modal" class="modal-toggle" bind:checked={$platformCreateModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={createPlatform} class="main flex flex-col items-center w-full pr-6 pt-2">
				<img src="/assets/card/platform_icon.svg" alt="game" class="mb-8" />
				<h3 class="text-3xl font-bold mb-12">Create a new Game</h3>

				<StyledInput
					className="mb-8 w-full"
					label="Game name"
					placeholder="Game"
					bind:val={nameInput}
					autofocus
					required
				/>
				<StyledInput
					className="mb-12 w-full"
					label="Game description"
					placeholder="Optional"
					bind:val={descInput}
				/>
				<StyledButton className="w-full" type="submit">Create</StyledButton>
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
