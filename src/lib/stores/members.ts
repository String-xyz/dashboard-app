import { writable, type Writable, get as getStore } from 'svelte/store';

export interface User {
	name: string;
	email: string;
	role: Role;
	self?: boolean;
	joinDate?: string;
	deactivatedAt?: string;
	isInvite?: boolean;
}

export enum Role {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export const rolesList = Object.values(Role);

export const currentUser: Writable<User> = writable({
	name: 'Miguel Leal',
	email: 'miguel@string.xyz',
	role: Role.OWNER,
	self: true
});

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
	}
]);

export const isPermissioned = (userRole: Role, minReqRole: Role) => {
	if (userRole == minReqRole) return true;

	if (userRole == Role.OWNER) return true;

	if (userRole == Role.ADMIN && minReqRole !== Role.OWNER) return true;

	return false;
}