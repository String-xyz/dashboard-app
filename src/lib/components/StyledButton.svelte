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

<style lang='postcss'>
	.btn {
		color: #FAF9F9;
	}

	.btn-outline {
		color: #006AB7;
	}

	.btn[disabled] {
		@apply btn-outline;
		border-color: #b6d5ec;
		color: #b6d5ec !important;
	}
</style>
