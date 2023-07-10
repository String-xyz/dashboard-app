<script lang="ts">
	import { contractCreateModalOpen, contractList, toast } from "$lib/stores";
	import { commonErrorHandler } from "$lib/common";
	import { contractService, type Network, type Platform } from "$lib/services";

	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import NetworkSelect from "$lib/components/ManageContracts/NetworkSelect.svelte";
	import GameSelect from "$lib/components/ManageContracts/GameSelect.svelte";
	import FunctionSelect from "$lib/components/ManageContracts/FunctionSelect.svelte";

	let currentStep: "info" | "games" | "functions" = "games";

	let selectedNetwork: Network | null;
	let selectedGames: Platform[] = [];
	let selectedFunctions: string[] = [];

	let nameInput = "";
	let addrInput = "";

	$: infoDisabled = !nameInput || !addrInput || !selectedNetwork;
	$: gamesDisabled = (selectedGames?.length == 0 ?? true);
	$: functionsDisabled = (selectedFunctions?.length == 0 ?? true) || gamesDisabled || infoDisabled;

	$: currentDisabled = currentStep == "info" ? infoDisabled : currentStep == "games" ? gamesDisabled : functionsDisabled;

	const createContract = async () => {
		try {
			console.log("create contract")
			console.log(selectedNetwork)
			console.log(selectedGames)
			console.log(selectedFunctions)
			if (!selectedNetwork || infoDisabled || gamesDisabled || functionsDisabled) return;

			await contractService.createContract({
				name: nameInput,
				address: addrInput,
				functions: selectedFunctions,
				networkId: selectedNetwork.id,
				platformIds: selectedGames.map((game) => game.id),
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
				createContract();
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
		$contractCreateModalOpen = false;

		nameInput = "";
		addrInput = "";
		selectedNetwork = null;
		selectedGames = [];
		selectedFunctions = [];

		currentStep = "info";
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($contractCreateModalOpen) {
			if (e.key == "Enter") {
				createContract();
			}
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="contract-create-modal" class="modal-toggle" bind:checked={$contractCreateModalOpen} />

<div class="modal">
	<div class="modal-box relative" class:functionSelectHeight={currentStep == "functions"}>
		<div class="flex flex-col">
			<button class="ml-auto mb-4" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={createContract} class="main flex flex-col items-center w-full">
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
				<h3 class="text-2xl font-bold mb-4">Add Smart Contract</h3>
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
							className="w-full mb-8"
							label="Contract address"
							placeholder="Contract address"
							bind:val={addrInput}
							required
						/>
						<NetworkSelect bind:selectedNetwork />
					{/if}
					{#if currentStep == "games"}
						<div class="flex flex-col border border-[##BEBCBA] rounded-[4px] bg-[#FAF9F9] w-full p-3">
							<h1 class="font-bold text-sm tracking-wider uppercase mr-auto mb-2">Associated games</h1>
							<p class="text-xs">Select the games you want able to use this contract</p>
							<GameSelect bind:selectedGames />
						</div>
					{/if}
					{#if currentStep == "functions"}
						<div class="flex flex-col border border-[##BEBCBA] rounded-[4px] bg-[#FAF9F9] w-full p-3">
							<h1 class="font-bold text-sm tracking-wider uppercase mr-auto mb-2">Contract functions</h1>
							<p class="text-xs">Enter the function signatures you want this contract to be able to use</p>
							<FunctionSelect bind:selectedFunctions />
						</div>
					{/if}
					<div class="flex justify-between items-center mt-10">
						{#if currentStep != "info"}
							<button on:click|preventDefault={backStep} class="w-1/2 bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase p-1 mr-4">
								Back
							</button>
						{/if}
						<StyledButton
							className={currentStep == "info" ? "w-full " : "w-1/2 "}
							action={nextStep}
							disabled={currentDisabled}
						>
							{#if currentStep == "functions"}
								Complete
							{:else}
								Continue
							{/if}
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

	.functionSelectHeight {
		height: 750px;
	}
</style>
