<script lang="ts">
	import type { User } from "$lib/stores";
	import Avatar from "../Avatar.svelte";

	export let user: User;
	export let className = '';

</script>

<div class={"user flex justify-between items-center py-3 w-full " + className}>
	<div class="flex justify-items-start pl-3">
		<Avatar name={user?.name} type="self" />
		<div class="ml-4">
			<p class="text-sm">{user?.name}</p>
			<p class="text-xs subtext">{user?.email}</p>
		</div>
	</div>
	<p class="text-sm mr-4">{user?.role}</p>
</div>

<style>
	.user {
		border: 1px solid #f2f2f2;
		border-radius: 4px;
	}

	.subtext {
		color: #bebcba;
	}

</style>