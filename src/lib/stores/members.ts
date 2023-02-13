import { writable, type Writable, get as getStore } from 'svelte/store';
import { currentUser, Role } from '$lib/stores';

export interface User {
	id?: string;
	name: string;
	email: string;
	role: Role;
	isInvite?: boolean;
	self?: boolean;
	joinDate?: string;
	deactivatedAt?: string;
}

export const members: Writable<User[]> = writable([
	getStore(currentUser),
	{
		name: 'Dante Ielpi',
		email: 'dante@string.xyz',
		role: Role.ADMIN
	},
	{
		name: 'Andrin Foster',
		email: 'andrin@string.xyz',
		role: Role.ADMIN,
		isInvite: true
	},
	{
		name: 'Wilfredo Alcala',
		email: 'wilfredo@string.xyz',
		role: Role.ADMIN
	}
]);