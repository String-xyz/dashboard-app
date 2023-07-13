<script lang="ts">
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";

	export let selectedFunctions: string[];

	export let showInput = true;

	let functionInput = "";

	let showEdit = false;

	let funcIdxToEdit: number | undefined;

	$: saveFunction = showEdit ? saveEditToList : addFunctionToList;

	const showAddFunction = () => {
		showInput = true;
	}

	const addFunctionToList = () => {
		if (functionInput) {
			selectedFunctions = [...selectedFunctions, functionInput];
			showInput = false;
			functionInput = "";
		}
	}

	const cancelAddFunction = () => {
		showInput = false;
		functionInput = "";
	}

	const removeFunctionFromList = (removeFuncIdx: number) => {
		selectedFunctions = selectedFunctions.filter((_, idx) => idx != removeFuncIdx);
	}

	const showEditFunction = (editFunc: string, funcIdx: number) => {
		functionInput = editFunc;
		funcIdxToEdit = funcIdx;
		showEdit = true;
		showInput = true;
	}

	const saveEditToList = () => {
		if (functionInput && funcIdxToEdit !== undefined) {
			selectedFunctions[funcIdxToEdit] = functionInput;
			// To force rerender of list
			selectedFunctions = selectedFunctions;

			showInput = false;
			showEdit = false;
			funcIdxToEdit = undefined;
			functionInput = "";
		}
	}

</script>


<div class="flex flex-col justify-center items-center mt-4 w-full">
	{#if showInput}
		<div class="flex flex-col bg-white rounded-[4px] w-full p-3">
			<StyledInput
				className="w-full"
				label="Function signature"
				placeholder="e.g. mintTo(address)"
				bind:val={functionInput}
				autofocus
			/>
			<div class="flex items-center mt-6 mb-1 ml-auto">
				{#if selectedFunctions?.length > 0}
					<button on:click={cancelAddFunction} class="bg-transparent border rounded-3xl border-[#BEBCBA] text-neutral w-24 h-11 mr-4">
						Cancel
					</button>
				{/if}
				<StyledButton
					className="rounded-3xl w-24"
					action={() => saveFunction()}
				>
				Save
				</StyledButton>
			</div>
		</div>
	{:else}
		<div class="border border-[#F2F2F2] rounded-[4px] bg-white w-full h-[125px] overflow-scroll">
			{#each selectedFunctions as funcSig, i}
				<div class="flex justify-between items-center p-3" class:row={i > 0}>
					<p class="text-sm text-primary">{funcSig}</p>
					<div class="flex items-center">
						<button on:click={() => showEditFunction(funcSig, i)} class="mr-3 text-sm text-primary uppercase tracking-wider font-semibold">
							Edit
						</button>
						<button on:click={() => removeFunctionFromList(i)} class="">
							<img src="/assets/dropdown/trash.svg" alt="delete" width="24px" height="24px" />
						</button>
					</div>
				</div>
			{:else}
				<h1 class="font-semibold m-4">No functions added</h1>
			{/each}
		</div>
	{/if}

	<button on:click|preventDefault={showAddFunction} class="text-primary bg-transparent mt-3 w-1/3 h-10">
		<img src="/assets/button/plus.svg" alt="+" class="inline mr-3" />
		Add Function
	</button>
</div>

<style>
	.row {
		border-top: 1px solid #F2F2F2;
	}
</style>
