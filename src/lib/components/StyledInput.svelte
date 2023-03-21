<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let className: string = '';
	export let borderError = false;
	export let autofocus = false;
	export let wrapper = false;
	export let focused = false;
	export let val = '';

	let inputElm: HTMLInputElement;

	onMount(() => {
		if (autofocus) {
			setTimeout(() => {
				inputElm.focus();
			}, 100);
		}
	});

</script>

<fieldset class={'group ' + className} class:!border-primary={focused} class:!border-error={borderError && !focused}>
	{#if label}
		<legend class="ml-3 px-2 text-sm font-medium" class:text-primary={focused}>
			{label}
		</legend>
	{:else}
		<div class="mt-2" />
	{/if}

	{#if wrapper}
		<slot />
	{:else}
		<input
			class="pl-5 pr-2 mb-2"
			on:focus={() => focused = true}
			on:blur={() => focused = false}
			bind:this={inputElm}
			bind:value={val}
			{...$$restProps}
		/>
	{/if}
</fieldset>

<style>
	.group {
		border: 2px solid #e6e4df;
		border-radius: 4px;
	}

	input {
		border: none;
		width: 100%;
	}

	input:focus {
		outline: none;
	}
</style>
