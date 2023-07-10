import { writable, type Writable } from 'svelte/store';
import type { TeamItem } from '$lib/common';

export const memberList: Writable<TeamItem[]> = writable([]);

export const deactUser: Writable<TeamItem | null> = writable();
export const ownershipTransferee: Writable<TeamItem | null> = writable();

// Manage Team Modals
export const inviteModalOpen = writable(false);
export const deactModalOpen = writable(false);
export const transferOwnerModalOpen = writable(false);