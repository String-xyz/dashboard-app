<script lang="ts">
	import type { ApiKeyResponse } from "$lib/services";
	import { isSandbox } from "$lib/utils";

	export let key: ApiKeyResponse;

	const getStatus = () => {
		if (key.deactivatedAt) return "deactivated";
		
		return isSandbox ? "test" : "live"
	}

	let status = getStatus();
	
</script>

<div class={"slabel flex flex-shrink items-center px-4 py-2 " + status}>
	<p class="capitalize text-sm font-semibold">{status}</p>
</div>

<style>
	.slabel {
		border-width: 1px;
		border-radius: 20px;
		max-width: 5.75rem;
		display: inline-block;
	}

	.test {
		border-color: #F3B04B;
		color: #F3B04B;
	}

	.live {
		border-color: #07AD5E;
		color: #07AD5E;
	}

	.deactivated {
		border-color: #BEBCBA;
		color: #BEBCBA;
	}
</style>