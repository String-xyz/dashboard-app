import { writable, type Writable } from 'svelte/store';
import type { Platform } from '$lib/services';

export const platformList: Writable<Platform[]> = writable([]);
export const selectedPlatform: Writable<Platform> = writable();

// Manage Platforms modals
export const platformCreateModalOpen = writable(false);
export const platformEditModalOpen = writable(false);
export const platformDeactModalOpen = writable(false);