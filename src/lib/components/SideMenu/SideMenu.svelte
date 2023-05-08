<script lang="ts">
	import { Role } from "$lib/common";
	import { menuItems } from "$lib/constants";
	import { currentUser } from "$lib/stores";
	import { authService } from "$lib/services";

	import Avatar from "../Avatar.svelte";
	import EnvIndicator from "./EnvIndicator.svelte";
	import MenuItem from "./MenuItem.svelte";
	import Signout from "./Signout.svelte";
</script>

<div class="side-menu flex flex-col">
	<img src="/assets/string_logo.svg" alt="String" width="75px" height="18px" />
	<div class="user my-6 flex justify-items-start">
		<Avatar user={$currentUser} />
		<div class="ml-2 w-40">
			<p class="text-sm truncate" title={$currentUser?.name}>{$currentUser?.name}</p>
			<p class="text-xs">{$currentUser?.role}</p>
		</div>
	</div>

	<EnvIndicator />

	<div class="divider" />

	<nav>
		<ul class="menu bg-transparent">
			{#each menuItems.filter((t) => authService.canView($currentUser?.role, t.minPerms ?? Role.MEMBER)) as tab}
				<MenuItem {tab} />
			{/each}
		</ul>
	</nav>

	<Signout />
</div>

<style>
	.side-menu {
		background-color: white;
		border: 1px solid #ededed;
		width: 260px;
		height: 100%;
		padding: 24px;
		overflow: hidden;
		position: absolute;
		z-index: 999;
	}

	.divider {
		margin-left: 2px;
		margin-right: 2px;
		/* margin-top: 24px;
		margin-bottom: 28px; */
	}
</style>
