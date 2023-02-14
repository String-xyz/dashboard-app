import { writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import type { User } from '$lib/stores';

export const activeModal: Writable<typeof SvelteComponent | null> = writable();

// Manage Team Modals
export const inviteModalOpen = writable(false);
export const deactModalOpen = writable(false);
export const keySuccessModalOpen = writable(false);
export const deactUser: Writable<User | null> = writable();
