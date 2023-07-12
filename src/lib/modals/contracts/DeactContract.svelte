<script lang="ts">
	import { commonErrorHandler } from "$lib/common";
	import { contractService } from "$lib/services";
	import { contractDeactModalOpen, contractList, selectedContract, networkList, toast } from "$lib/stores";

	import StyledInput from "$lib/components/StyledInput.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";

	let pwdInput = "";
	let showPwdInvalid = false;

	$: disabled = pwdInput.length < 8;

	const deactivateContract = async () => {
		try {
			if (!$selectedContract || disabled) return;

			await contractService.deactivateContract($selectedContract.id);
			$contractList = await contractService.listContracts();

			close();
			$toast.show("success", "Contract deactivated");
		} catch (err: any) {
			commonErrorHandler(err, "contract");
		}
	};

	const close = () => {
		pwdInput = "";
		$contractDeactModalOpen = false;
		$selectedContract = null;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($contractDeactModalOpen) {
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="contract-deact-modal" class="modal-toggle" bind:checked={$contractDeactModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={deactivateContract} class="main flex flex-col items-center w-full pr-6">
				<h3 class="text-2xl font-bold my-4">Hold on...</h3>
				<p class="mb-8">Are you sure you want to <span class="text-warning">deactivate</span> this smart contract?</p>
				
				{#if $selectedContract}
					{@const networkName = contractService.getNameByNetworkId($selectedContract.networkId, $networkList)}
					<div class="flex flex-col border border-[#F2F2F2] rounded-[4px] p-3 w-full mb-8">
						<span class="mb-1 font-semibold select-all">{$selectedContract.name}</span>
						<span class="mb-3 text-sm font-medium flex items-center">
							<img src={contractService.getNetworkIconPath(networkName)} alt={`${networkName} logo`} class="mr-2" />
							{networkName}
						</span>
						<span class="text-sm font-medium select-all">{$selectedContract.address}</span>
					</div>
				{/if}
				<input autocomplete="username" hidden class="hidden" />

				<StyledInput
					className="w-full"
					label="Password Request"
					type="password"
					autocomplete="current-password"
					placeholder="********"
					bind:val={pwdInput}
					required
					autofocus
				/>

				{#if showPwdInvalid && pwdInput !== ""}
					<p class="text-error mt-2 mb-8 mr-auto">Invalid password</p>
				{:else}
					<div class="mb-10" />
				{/if}

				<StyledButton className="w-full btn-warning" type="submit" {disabled}>Deactivate</StyledButton>

 				<button on:click|preventDefault={close} class="mt-6 p-1 bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase">
					Cancel
				</button>
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
