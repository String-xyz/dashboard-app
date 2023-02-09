import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export interface User {
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

if (browser) {
	// get from local storage
	const stored = localStorage.getItem('user');
	if (stored) {
		user.set(JSON.parse(stored));
	}

	// set in local storage
	user.subscribe(value => {
		localStorage.setItem('user', JSON.stringify(value));
	});
	
}