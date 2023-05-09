<script lang="ts">
	import config from '$lib/config';
	import type { ApiKey } from '$lib/common';
	import { onMount } from 'svelte';

	export let key: ApiKey;

	let status = "";

	onMount(() => {
		status = getStatus();
	});

	const getStatus = () => {
		if (key.type === "secret") {
			return "secret";
		}

		return config.IS_SANDBOX ? "test" : "live";
	}

</script>

<div class={"slabel flex items-center px-4 py-2 " + status}>
	<p class="capitalize text-sm font-semibold">{status}</p>
</div>

<style>
	.slabel {
		border-width: 1px;
		border-radius: 20px;
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

	.secret {
		border-color: #BEBCBA;
		color: #BEBCBA;
	}

</style>