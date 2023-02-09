import { writable, type Writable, get as getStore } from 'svelte/store';
import { currentUser, Role } from '$lib/stores';
import type { Member } from '$lib/services';

export interface User extends Member {
	self?: boolean;
	joinDate?: string;
	isInvite?: boolean;
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
		name: 'Wilfredo Acala',
		email: 'wilfredo@string.xyz',
		role: Role.ADMIN
	}
]);
