import { writable, type Writable } from 'svelte/store';
import type { Platform } from '$lib/services';

export const platformCreateModalOpen = writable(false);
export const platformEditModalOpen = writable(false);
export const platformDeactModalOpen = writable(false);

export const selectedPlatform: Writable<Platform> = writable();

export const platformList: Writable<Platform[]> = writable([]);
