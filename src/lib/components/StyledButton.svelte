<script lang='ts'>
	export let action = () => {};
	export let disabled = false;
	export let className = "";
</script>

<button
	on:click={action}
	{disabled}
	class={"btn btn-primary rounded border-2 font-bold text-sm h-11 mb-6 " + className}
>
	<slot />
</button>

<style>
	.btn {
		color: #FAF9F9;
	}

	.btn-outline {
		color: #006AB7;
	}

	.btn[disabled] {
		background-color: transparent;
		border: 2px solid #b6d5ec;
		color: #b6d5ec !important;
	}
</style>
