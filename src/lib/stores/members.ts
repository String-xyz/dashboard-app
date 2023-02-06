import { writable, type Writable, get as getStore } from 'svelte/store';

export interface User {
	name: string;
	email: string;
	role: Roles;
	self?: boolean;
	joinDate?: string;
}

export enum Roles {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export const user: Writable<User> = writable({
	name: 'Miguel Leal',
	email: 'miguel@string.xyz',
	role: Roles.OWNER,
	self: true
});

export const members: Writable<User[]> = writable([
	getStore(user),
	{
		name: 'Dante Ielpi',
		email: 'dante@string.xyz',
		role: Roles.ADMIN
	},
	{
		name: 'Andrin Foster',
		email: 'andrin@string.xyz',
		role: Roles.ADMIN
	}
])