<script lang="ts">
	import { commonErrorHandler } from "$lib/common/errors";
	import { authService } from "$lib/services";


	const signout = async () => {
		try {
			await authService.logout();
		} catch (e: any) {
			return commonErrorHandler(e, "logout");
		}
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
