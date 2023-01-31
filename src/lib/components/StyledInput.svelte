<script lang="ts">

	export let label: string;
	export let className: string = "";

	let focused = false;

</script>

<fieldset class={"group " + className} class:border-primary={focused}>
	{#if label}
		<legend class="ml-3 px-2 text-sm" class:text-primary={focused}>
			{label}
		</legend>	
	{:else}
		<div class="mt-2" />
	{/if}

	<input 
		class="pl-5 pr-2 mb-2"
		on:focus={() => focused = true}
		on:blur={() => focused = false}
		{...$$restProps}
	>
</fieldset>

<style>
	.group {
		border: 2px solid #E6E4DF;
		border-radius: 4px;
	}

	.border-primary {
		border-color: #006AB7 !important;	
	}

	input {
		border:none;
		width:100%;
	}

	input:focus {
        outline: none;
    }
</style>
