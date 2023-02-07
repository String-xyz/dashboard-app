import { writable, type Writable, get as getStore } from 'svelte/store';

export interface User {
	name: string;
	email: string;
	role: Role;
	self?: boolean;
	joinDate?: string;
	deactivatedAt?: string;
}

export enum Role {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export const user: Writable<User> = writable({
	name: 'Miguel Leal',
	email: 'miguel@string.xyz',
	role: Role.OWNER,
	self: true
});

export const members: Writable<User[]> = writable([
	getStore(user),
	{
		name: 'Dante Ielpi',
		email: 'dante@string.xyz',
		role: Role.ADMIN
	},
	{
		name: 'Andrin Foster',
		email: 'andrin@string.xyz',
		role: Role.ADMIN
	}
])