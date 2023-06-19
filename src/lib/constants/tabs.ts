import config from "$lib/config";
import { Role, type MenuItem } from "$lib/common/types";

const assetPath = '/assets/tab/';

export enum NavItem { 
	DASHBOARD         = 'Dashboard',
	MANAGE_TEAM       = 'Your Organization',
	MANAGE_PLATFORMS  = 'Manage Games',
	MANAGE_KEYS       = 'Manage API Keys',
	MANAGE_CONTRACTS  = 'Your Smart Contracts',
	VERIFY_ACCOUNT    = 'Verify Account',
	VIEW_DOCS         = 'View API Docs',
	SETTINGS          = 'Settings'
};

export const menuItems: MenuItem[] = [
	{
		name: NavItem.DASHBOARD,
		icon: assetPath + 'dashboard.svg',
	},
	{
		name: NavItem.MANAGE_TEAM,
		icon: assetPath + 'manage_team.svg',
	},
	{ 
		name: NavItem.MANAGE_PLATFORMS,
		icon: assetPath + 'manage_platforms.svg',
	},
	{
		name: NavItem.MANAGE_KEYS,
		icon: assetPath + 'manage_keys.svg',
	},
	{
		name: NavItem.MANAGE_CONTRACTS,
		icon: assetPath + 'manage_contracts.svg',
	},
	{
		name: NavItem.VERIFY_ACCOUNT,
		icon: assetPath + 'verify_account.svg',
		href: config.KYB_URL,
		minPerms: Role.ADMIN
	},
	{
		name: NavItem.VIEW_DOCS,
		icon: assetPath + 'view_docs.svg',
		href: config.DOCS_URL
	},
	{
		name: NavItem.SETTINGS,
		icon: assetPath + 'settings.svg',
	}
];