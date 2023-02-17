<script lang="ts">
	import Avatar from '../Avatar.svelte';
	import { activeTab, menuItems, currentUser, getTabByName, isPermissioned, Role } from '$lib/stores';
	import EnvIndicator from './EnvIndicator.svelte';
	import MenuItem from './MenuItem.svelte';
	import Signout from './Signout.svelte';

	const settings = getTabByName('Settings');

	const arrowAction = () => {
		if (!settings) return;

		$activeTab = settings;
	}

	const truncate = (text: string, toLength = 16) => {
		if (text.length > toLength) {
			return text.slice(0, toLength) + "...";
		}

		return text;
	}

</script>

<div class="side-menu flex flex-col">
	<img src="/assets/string_logo.svg" alt="String" width="75px" height="18px" />
	<div class="user my-6 flex justify-items-start">
		<Avatar name={$currentUser.name} />
		<div class="ml-2">
			<p class="text-sm">
				<span aria-label={$currentUser.name}>{truncate($currentUser.name)}</span>
				<button on:click={arrowAction}>
					<img src="/assets/button/right_arrow.svg" alt=">" class="ml-2" />
				</button>
			</p>
			<p class="text-xs">{$currentUser.role}</p>
		</div>
	</div>

	<EnvIndicator />

	<div class="divider" />

	<nav>
		<ul class="menu bg-transparent">
			{#if $menuItems}
				{#each $menuItems.filter(t => isPermissioned($currentUser.role, t.minPerms ?? Role.MEMBER)) as tab}
					<MenuItem {tab} />
				{/each}
			{/if}
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
