<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let className: string = '';
	export let autofocus = false;
	export let val = '';

	let focused = false;
	let inputElm: HTMLInputElement;

	onMount(() => {
		if (autofocus) {
			inputElm.focus();
		}
	});

</script>

<fieldset class={'group ' + className} class:border-primary={focused}>
	{#if label}
		<legend class="ml-3 px-2 text-sm font-medium" class:text-primary={focused}>
			{label}
		</legend>
	{:else}
		<div class="mt-2" />
	{/if}

	<input
		class="pl-5 pr-2 mb-2"
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
		bind:this={inputElm}
		bind:value={val}
		{...$$restProps}
	/>
</fieldset>

<style>
	.group {
		border: 2px solid #e6e4df;
		border-radius: 4px;
	}

	.border-primary {
		border-color: #006ab7 !important;
	}

	input {
		border: none;
		width: 100%;
	}

	input:focus {
		outline: none;
	}
</style>
