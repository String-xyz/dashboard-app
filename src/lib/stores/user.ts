import { writable, type Writable } from 'svelte/store';

interface User {
	name: string;
	email: string;
	role: string;
}

export enum Roles {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export const user: Writable<User> = writable({
	name: 'Miguel Leal',
	email: 'miguel@email.com',
	role: Roles.OWNER
});
