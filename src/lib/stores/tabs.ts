import { writable, type Writable, get as getStore } from 'svelte/store';
import type { SvelteComponent } from 'svelte';

import { Role } from '$lib/stores';

export interface MenuItem {
	name: MenuItems;
	icon: string;
	view?: typeof SvelteComponent;
	href?: string;
	minPerms?: Role;
}

const assetPath = '/assets/tab/';

const DOCS_URL = import.meta.env.VITE_DOCS_URL;
const KYB_URL = import.meta.env.VITE_KYB_URL;

export enum MenuItems { 
	DASHBOARD = 'Dashboard',
	MANAGE_TEAM = 'Manage Team',
	MANAGE_KEYS = 'Manage API Keys',
	VERIFY_ACCOUNT = 'Verify Account',
	VIEW_DOCS = 'View API Docs',
	SETTINGS = 'Settings'
};

export const menuItems: Writable<MenuItem[]> = writable([
	{
		name: MenuItems.DASHBOARD,
		icon: assetPath + 'dashboard.svg',
	},
	{
		name: MenuItems.MANAGE_TEAM,
		icon: assetPath + 'manage_team.svg',
	},
	{
		name: MenuItems.MANAGE_KEYS,
		icon: assetPath + 'manage_keys.svg',
	},
	{
		name: MenuItems.VERIFY_ACCOUNT,
		icon: assetPath + 'verify_account.svg',
		href: KYB_URL,
		minPerms: Role.ADMIN
	},
	{
		name: MenuItems.VIEW_DOCS,
		icon: assetPath + 'view_docs.svg',
		href: DOCS_URL
	},
	{
		name: MenuItems.SETTINGS,
		icon: assetPath + 'settings.svg',
	}
]);

export const getTabByName = (name: string) => {
	const tabs = getStore(menuItems);
	return tabs.find((item) => item.name === name) ?? tabs[0];
}

export const activeTab: Writable<MenuItem> = writable();
