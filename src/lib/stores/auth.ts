import { writable, type Writable } from "svelte/store";
import { browser } from '$app/environment';
import type { Member } from "$lib/services";
import { Role } from "$lib/types";


export const loginEmail = writable("");
export const resetToken = writable("");

export const rolesList = Object.values(Role);

export const currentUser: Writable<Member> = writable();

/* Local storage */
if (browser) {
	// get from local storage
	const stored = localStorage.getItem('user');
	if (stored) {
		try {
			currentUser.set(JSON.parse(stored));
		} catch (e) {
			console.error(e);
		}
	}

	// set in local storage
	currentUser.subscribe(value => {
		localStorage.setItem('user', JSON.stringify(value));
	});
}