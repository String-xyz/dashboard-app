<script lang="ts">
	import { commonErrorHandler } from "$lib/common";
	import { contractService } from "$lib/services";
	import { contractEditModalOpen, contractList, selectedContract, toast } from "$lib/stores";

	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

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
			if (infoDisabled || gamesDisabled || functionsDisabled) return;

			await contractService.createContract({
				name: nameInput,
				address: addrInput,
				functions: functionsInput,
				networkId: networkIdInput,
				platformId: platformIdInput,
			});
			$contractList = await contractService.listContracts();

			close();
			$toast.show("success", "Contract added");
		} catch (err: any) {
			commonErrorHandler(err, "contract");
		}
	};

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
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={editContract} class="main flex flex-col items-center w-full pr-6 pt-2">
				<div class="divider" />
				<img src="/assets/card/contract_icon.svg" alt="contract" class="mb-4" />
				<h3 class="text-2xl font-bold mb-12">Edit Smart Contract</h3>
				<div>
					
				</div>
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
		height: 700px;
	}
</style>
