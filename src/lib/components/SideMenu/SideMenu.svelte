<script>
	import Avatar from "../Avatar.svelte";
	import { user } from "$lib/stores"
</script>

<div class="side-menu">
	<img src="/assets/string_logo.svg" alt="String" />
	<div class="user my-6">
		<Avatar />
		<span class="flex ml-2 text-sm">
			{$user.email}
			<img src="/assets/right_arrow.svg" alt=">" class="ml-3" />
		</span>
		<!-- <span class="inline ml-2">
			{$user.email}
			<img src="/assets/right_arrow.svg" alt=">" class="ml-3" />
		</span> -->
		<p class="text-xs">{$user.role}</p>
	</div>
</div>

<style>
	.side-menu {
		border: 1px solid #EDEDED;
		width: 260px;
		height: 100vh;
		padding: 24px;
	}
</style>