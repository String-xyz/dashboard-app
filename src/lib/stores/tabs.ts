import { writable, type Writable, get as getStore } from 'svelte/store';
import type { SvelteComponent } from 'svelte';

import Dashboard from '$lib/views/Dashboard.svelte';
import ManageTeam from '$lib/views/ManageTeam.svelte';
import ManageKeys from '$lib/views/ManageKeys.svelte';
import Settings from '$lib/views/Settings.svelte';
import { Role } from '$lib/stores';

export interface MenuItem {
	name: string;
	icon: string;
	view?: typeof SvelteComponent;
	href?: string;
	minPerms?: Role;
}

const assetPath = '/assets/tab/';

const DOCS_URL = import.meta.env.VITE_DOCS_URL;
const KYB_URL = import.meta.env.VITE_KYB_URL;

// Make Store to try to solve the error
// ReferenceError: Cannot access 'view' before initialization
export const menuItems: Writable<MenuItem[]> = writable([
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
		href: KYB_URL,
		minPerms: Role.ADMIN
	},
	{
		name: 'View API Docs',
		icon: assetPath + 'view_docs.svg',
		href: DOCS_URL
	},
	{
		name: 'Settings',
		icon: assetPath + 'settings.svg',
		view: Settings
	}
]);

export const getTabByName = (name: string) => {
	const tabs = getStore(menuItems);
	return tabs.find((item) => item.name === name) ?? tabs[0];
}

export const activeTab: Writable<MenuItem> = writable();
