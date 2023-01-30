import { writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';

import Dashboard from '$lib/views/Dashboard.svelte';
import ManageTeam from '$lib/views/ManageTeam.svelte';
import ManageKeys from '$lib/views/ManageKeys.svelte';
import Settings from '$lib/views/Settings.svelte';

export interface MenuItem {
	name: string;
	icon: string;
	view?: typeof SvelteComponent;
	href?: string;
}

const assetPath = '/assets/tab/';

export const tabs: MenuItem[] = [
	{
		name: 'Dashboard',
		icon: assetPath + 'dashboard.svg',
		view: Dashboard
	},
	{
		name: 'Manage Team',
		icon: assetPath + 'manage_team.svg',
		view: ManageTeam
	},
	{
		name: 'Manage API Keys',
		icon: assetPath + 'manage_keys.svg',
		view: ManageKeys
	},
	{
		name: 'Verify Account',
		icon: assetPath + 'verify_account.svg',
		href: 'https://docs.google.com/forms/d/e/1FAIpQLScxHTnCS-w4371nx9ZTM4gVxV6MV-6CtwllzfxMeB61dsLrCw/viewform'
	},
	{
		name: 'View API Docs',
		icon: assetPath + 'view_docs.svg',
		href: 'https://docs.string.xyz/docs'
	},
	{
		name: 'Settings',
		icon: assetPath + 'settings.svg',
		view: Settings
	}
]

export const activeTab: Writable<MenuItem> = writable(tabs[0]);
