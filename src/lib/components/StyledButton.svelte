<script lang="ts">
	export let action = () => {};
	export let className = '';
	export let elem: HTMLButtonElement | null = null;
</script>

<button
	on:click={action}
	class={'btn btn-primary rounded border-2 font-bold text-sm tracking-wider whitespace-nowrap min-h-0 h-11 ' + className}
	bind:this={elem}
	{...$$restProps}
>
	<slot />
</button>

<style>
	.btn {
		color: #faf9f9;
	}

	.btn-outline {
		color: #006ab7;
	}

	.btn[disabled] {
		background-color: transparent;
		border: 2px solid #b6d5ec;
		color: #b6d5ec !important;
	}

</style>
