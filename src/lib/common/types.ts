import type { NavItem } from "$lib/constants/tabs";
import type { ApiKeyResponse } from "$lib/services";
import type { SvelteComponent } from 'svelte';

export enum Role {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export type TeamItem = {
	id: string;
	name: string;
	role: Role;
	email: string;
	status: string;
	isInvite?: boolean; // is this an invite?
	self?: boolean; // is this the current user?
	joinDate?: string; // member - invites don't have a join date
	deactivatedAt?: string; // member
}

export interface ApiKey extends ApiKeyResponse {
	showFullKey?: boolean; // For UI
}

export interface MenuItem {
	name: NavItem;
	icon: string;
	view?: typeof SvelteComponent;
	href?: string;
	minPerms?: Role;
}