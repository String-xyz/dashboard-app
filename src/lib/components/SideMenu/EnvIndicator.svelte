<script lang="ts">
	import config from '$lib/config';

	const isSandbox = config.IS_SANDBOX;

	const checkmark = isSandbox ? '/assets/test_check.svg' : '/assets/live_check.svg';

	const indicatorText = isSandbox ? 'You’re in sandbox mode.' : 'You’re in live mode.';

	const visitText = isSandbox ? 'Visit production mode' : 'Visit sandbox mode';

	const altLocation = isSandbox ? config.PROD_DASH_URL : config.SBOX_DASH_URL;
</script>

<div class="env">
	<p class="text-sm flex items-center">
		<img src={checkmark} alt="check" class="inline mr-2" />
		{indicatorText}
	</p>

	<a href={altLocation} class="mt-2 text-xs text-primary">
		{visitText}
		<img src="/assets/indicator/ext_link.svg" alt="link" class="inline ml-2" />
	</a>
</div>

<style>
	.env {
		border: 1px solid #f2f2f2;
		border-radius: 4px;
		padding: 10px;
	}
</style>
