import { writable, type Writable } from 'svelte/store';
import type { Network, Contract } from '$lib/services';

export const networkList: Writable<Network[]> = writable([]);
export const contractList: Writable<Contract[]> = writable([]);
export const selectedContract: Writable<Contract | null> = writable();

// Manage Contracts modals
export const contractCreateModalOpen = writable(false);
export const contractEditModalOpen = writable(false);
export const contractDeactModalOpen = writable(false);