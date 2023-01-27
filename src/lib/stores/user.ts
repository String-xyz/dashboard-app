import { writable, type Writable } from 'svelte/store';

interface User {
	fname?: string;
	lname?: string;
	email: string;
	role: string;
}

export enum Roles {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export const user: Writable<User> = writable({
	fname: 'Miguel',
	lname: 'Leal',
	email: 'miguel@email.com',
	role: Roles.OWNER
});
