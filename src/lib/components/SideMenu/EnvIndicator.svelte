<script lang="ts">
	const ENV = import.meta.env.VITE_ENV;

	const PROD_URL = import.meta.env.VITE_PROD_DASH_URL

	const TEST_URL = import.meta.env.VITE_TEST_DASH_URL

	const isLive = ENV === "live"

	const checkmark = isLive ? "/assets/live_check.svg" : "/assets/test_check.svg"

	const indicatorText = isLive ? "You’re in live mode." : "You’re in sandbox mode."

	const visitText = isLive ? "Visit sandbox mode" : "Visit production mode"

	const altLocation = isLive ? TEST_URL : PROD_URL
</script>

<div class="env">
	<p class="text-sm">
		<img src={checkmark} alt="check" class="inline mr-2" />
		{indicatorText}
	</p>

	<a href={altLocation} class="mt-2 text-xs text-primary">
		{visitText}
		<img src="/assets/ext_link.svg" alt="link" class="inline ml-2" />
	</a>
</div>

<style>
	.env {
		border: 1px solid #F2F2F2;
		border-radius: 4px;
		padding: 10px;
	}
</style>