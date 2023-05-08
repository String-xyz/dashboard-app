<script lang="ts">
	import { commonErrorHandler, type ApiKey } from "$lib/common";
	import { keyService, platformService } from "$lib/services";
	import { platformDeactModalOpen, platformList, selectedPlatform, toast } from "$lib/stores";

	import StyledButton from "$lib/components/StyledButton.svelte";
	import StyledInput from "$lib/components/StyledInput.svelte";
	import { onMount } from "svelte";

	let apiKeys: ApiKey[] = [];

	let pwdInput = "";
	let showPwdInvalid = false;

	$: disabled = pwdInput.length < 8;

	selectedPlatform.subscribe(async () => {
		apiKeys = await keyService.listApiKeys($selectedPlatform?.id);
	});

	const deactivatePlatform = async () => {
		try {
			await platformService.deactivatePlatform($selectedPlatform.id);
			$platformList = await platformService.listPlatforms();

			close();
			$toast.show("success", "Game deactivated");
		} catch (err: any) {
			commonErrorHandler(err, "Game");
		}
	};

	const close = () => {
		$platformDeactModalOpen = false;
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($platformDeactModalOpen) {
			if (e.key == "Escape") {
				close();
			}
		}
	};
</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="platform-deact-modal" class="modal-toggle" bind:checked={$platformDeactModalOpen} />

<div class="modal">
	<div class="modal-box relative">
		<div class="flex flex-col">
			<button class="ml-auto" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<form on:submit={deactivatePlatform} class="main flex flex-col items-center w-full pr-6 pt-2">
				<h3 class="text-2xl font-bold mb-4">Deactivate Game</h3>
				<p class="mb-8">Are you sure you want to <span class="text-warning">deactivate</span> this Game?</p>
				<div class="info-card flex flex-col justify-center items-center py-3 px-4 w-full mb-6">
					<p class="font-bold">{$selectedPlatform?.name}</p>
					{#if $selectedPlatform?.description}
						<p class="text-sm mt-3 truncate">{$selectedPlatform?.description}</p>
					{/if}
				</div>
				<div class="key-warning w-full flex flex-col items-center p-4 mb-6 pt-5">
					<div class="flex">
						<img src="/assets/indicator/warning.svg" alt="warning" width="32px" height="32px" class="ml-1 mr-4 mb-2" />
						<p class="warning-text text-xs text-center mb-3">
							Deactivating this Game will disable its associated API keys and deny it from using our services. 
							Before deactivating, please consider the impact of disabling the following keys:
						</p>
					</div>
					<div class="key-list w-full p-3 overflow-scroll">
						{#each apiKeys as key, i}
							{#if i > 0}
								<div class="divider my-2" />
							{/if}
							<span class="text-sm font-semibold">
								<img src="/assets/key_icon.svg" alt="key" class="inline mr-1" width="16px" height="16px" />
								{key.data}
							</span>
						{:else}
							<p class="text-xs text-neutral text-center mt-2">No keys found</p>
						{/each}
					</div>
				</div>
				<input autocomplete="username" hidden class="hidden" />

				<StyledInput
					className="w-full"
					label="Enter Password"
					type="password"
					autocomplete="current-password"
					placeholder="********"
					bind:val={pwdInput}
					required
					autofocus
				/>
				{#if showPwdInvalid && pwdInput !== ""}
					<p class="text-error mt-2 mb-6 mr-auto">Invalid password</p>
				{:else}
					<div class="mb-8" />
				{/if}
				<StyledButton className="w-full btn-warning" type="submit" {disabled}>Deactivate</StyledButton>
				<button class="mt-6 p-1 bg-transparent text-sm text-primary font-bold tracking-wider border-none no-animation uppercase" on:click={close}>
					Cancel
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.info-card {
		border: 1px solid #f2f2f2;
		border-radius: 4px;
	}

	.key-warning {
		background: #FFFBED;
		border: 1px solid #FCD28C;
		border-radius: 4px;
	}

	.key-list {
		height: 110px;
		background: #FFFFFF;
		border-radius: 4px;
	}

	.warning-text {
		color: #181818;
	}

	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 60px;
		padding-right: 36px;
		padding-top: 36px;
		padding-bottom: 12px;
		border-radius: 8px;
		width: 600px;
		max-width: 600px;
		height: 700px;
	}


</style>
