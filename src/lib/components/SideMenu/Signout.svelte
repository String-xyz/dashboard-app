<script lang="ts">
	const signout = () => {
		console.log('Mock signout');
	}

</script>

<div class="flex justify-center mt-auto">
	<button class="btn bg-transparent text-xs border-none no-animation" on:click={signout}
		>Sign Out
	</button>
</div>

<style>
	.btn {
		color: #f56161;
	}

	.btn:hover {
		border: none;
		background-color: transparent;
	}
</style>
