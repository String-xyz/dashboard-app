<script>
	export let action = () => {};
	export let disabled = false;
	export let wide = true;
	export let outline = false;
</script>

<button on:click={action} {disabled} class:btn-outline={outline} class:btn-wide={wide} class:w-40={!wide} class="btn btn-primary rounded border-2 tracking-wider text-white h-11 mb-6">
	<slot />
</button>

<style>
	.btn[disabled] {
		background-color: #B6D5EC;
		color: #FAF9F9;
	}
</style>