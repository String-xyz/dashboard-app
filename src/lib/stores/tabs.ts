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

const DOCS_URL = import.meta.env.VITE_DOCS_URL;
const KYB_URL = import.meta.env.VITE_KYB_URL;

export function getMenuItems(): MenuItem[] {
	return [
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
			href: KYB_URL
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
	];
}

export const getTabByName = (name: string) => {
	const tabs = getMenuItems();
	return tabs.find((item) => item.name === name) ?? tabs[0];
}

export const activeTab: Writable<MenuItem> = writable();