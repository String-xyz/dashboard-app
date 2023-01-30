<script>
	import Avatar from '../Avatar.svelte';
	import { tabs, activeTab, user, getTabByName } from '$lib/stores';
	import EnvIndicator from './EnvIndicator.svelte';
	import MenuItem from './MenuItem.svelte';
	import Signout from './Signout.svelte';

	const settings = getTabByName('Settings');

	const arrowAction = () => {
		if (!settings) return;

		$activeTab = settings;
	};
</script>

<div class="side-menu flex flex-col">
	<img src="/assets/string_logo.svg" alt="String" width="75px" height="18px" />
	<div class="user my-6 flex justify-items-start">
		<Avatar name={$user.name} />
		<div class="ml-2">
			<p class="text-sm break-all">
				{$user.email}
				<button on:click={arrowAction}>
					<img src="/assets/right_arrow.svg" alt=">" class="ml-2" />
				</button>
			</p>
			<p class="text-xs">{$user.role}</p>
		</div>
	</div>

	<EnvIndicator />

	<div class="divider" />

	<nav>
		<ul class="menu bg-transparent">
			{#each tabs as tab}
				<MenuItem {tab} />
			{/each}
		</ul>
	</nav>

	<Signout />
</div>

<style>
	.side-menu {
		border: 1px solid #ededed;
		width: 260px;
		height: 100vh;
		padding: 24px;
		position: fixed;
	}

	.divider {
		margin-left: 2px;
		margin-right: 2px;
		/* margin-top: 24px;
		margin-bottom: 28px; */
	}
</style>
