<script lang="ts">
	import { commonErrorHandler } from "$lib/common";
	import { contractService } from "$lib/services";
	import { contractEditModalOpen, contractList, selectedContract, toast } from "$lib/stores";

	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import NetworkSelect from "$lib/components/ManageContracts/NetworkSelect.svelte";

	let currentStep: "info" | "games" | "functions" = "info";

	let nameInput: string;
	let addrInput: string;
	let functionsInput: string[];
	let networkIdInput: string;
	let platformIdInput: string;

	$: infoDisabled = !nameInput || !addrInput || !networkIdInput;
	$: gamesDisabled = !platformIdInput;
	$: functionsDisabled = !functionsInput;

	const editContract = async () => {
		try {
			if (!$selectedContract || infoDisabled || gamesDisabled || functionsDisabled) return;

			await contractService.editContract($selectedContract?.id, {
				name: nameInput,
				address: addrInput,
				functions: functionsInput,
				networkId: networkIdInput,
			});
			$contractList = await contractService.listContracts();

			close();
			$toast.show("success", "Contract added");
		} catch (err: any) {
			commonErrorHandler(err, "contract");
		}
	};

	const nextStep = () => {
		switch (currentStep) {
			case "info":
				currentStep = "games";
				break;
			case "games":
				currentStep = "functions";
				break;
			case "functions":
				editContract();
				break;
		}
	}

	const backStep = () => {
		switch (currentStep) {
			case "info":
				close();
				break;
			case "games":
				currentStep = "info";
				break;
			case "functions":
				currentStep = "games";
				break;
		}
	}

	const close = () => {
		nameInput = "";
		addrInput = "";
		functionsInput = [];
		networkIdInput = "";
		platformIdInput = "";

		$contractEditModalOpen = false;

	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($contractEditModalOpen) {
			if (e.key == "Enter") {
				editContract();
			}
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="contract-edit-modal" class="modal-toggle" bind:checked={$contractEditModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto mb-4" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={editContract} class="main flex flex-col items-center w-full">
				<div class="flex justify-between w-full font-bold uppercase text-sm pr-4">
					<div class="flex items-center">
						<div class="dot mr-2" class:active-dot={currentStep == "info"}>
							<span>1</span>
						</div>
						<span>Information</span>
					</div>
					<div class="flex items-center">
						<div class="dot mr-2" class:active-dot={currentStep == "games"}>
							<span>2</span>
						</div>
						<span>Games</span>
					</div>
					<div class="flex items-center">
						<div class="dot mr-2" class:active-dot={currentStep == "functions"}>
							<span>3</span>
						</div>
						<span>Functions</span>
					</div>
				</div>
				<div class="divider" />
				<img src="/assets/card/contract_icon.svg" alt="contract" class="mb-4" />
				<h3 class="text-2xl font-bold mb-4">Edit Smart Contract</h3>
				<div class="border border-[#F2F2F2] rounded-[4px] w-full p-8">
					{#if currentStep == "info"}
						<StyledInput
							className="w-full mb-6"
							label="Contract name"
							placeholder="Contract name"
							bind:val={nameInput}
							required
							autofocus
						/>
						<StyledInput
							className="w-full mb-6"
							label="Contract address"
							placeholder="Contract address"
							bind:val={addrInput}
							required
						/>
						<NetworkSelect />
					{/if}
					<div class="flex justify-between items-center mt-8">
						{#if currentStep != "info"}
							<div class="w-1/2">
								<button on:click|preventDefault={backStep} class="w-full bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase p-1">
									Back
								</button>
							</div>
						{/if}
						<StyledButton
							className="w-full"
							action={nextStep}
						>
							Continue
						</StyledButton>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	.dot {
		@apply border;
		@apply border-primary;
		@apply text-neutral;
		@apply text-sm;
		@apply font-bold;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.active-dot {
		@apply bg-primary;
		@apply text-gray-blue-10;
	}

	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding: 32px;
		border-radius: 8px;
		width: 600px;
		max-width: 600px;
		height: 700px;
	}
</style>
