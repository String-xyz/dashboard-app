<script lang="ts">
	export let action = () => {};
	export let className = '';
</script>

<button
	on:click={action}
	class={'btn btn-primary rounded border-2 font-bold text-sm tracking-wider min-h-0 h-11 mb-6 ' + className}
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
