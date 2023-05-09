import { writable, type Writable } from 'svelte/store';
import type { TeamItem } from '$lib/common';
import type { Member } from '$lib/services';

export const members: Writable<Member[]> = writable([]);
export const teamItems: Writable<TeamItem[]> = writable([]);

// Manage Team Modals
export const inviteModalOpen = writable(false);
export const deactModalOpen = writable(false);
export const transferOwnerModalOpen = writable(false);

export const deactUser: Writable<TeamItem | null> = writable();
export const ownershipTransferee: Writable<TeamItem | null> = writable();
