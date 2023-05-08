import { writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import type { TeamItem } from '$lib/common';

export const activeModal: Writable<typeof SvelteComponent | null> = writable();

// Manage Team Modals
export const inviteModalOpen = writable(false);
export const deactModalOpen = writable(false);
export const transferOwnerModalOpen = writable(false);

// Manage Platforms Modals

// Manage Keys Modals
export const keySuccessModalOpen = writable(false);

export const deactUser: Writable<TeamItem | null> = writable();
export const ownershipTransferee: Writable<TeamItem | null> = writable();
