import { writable, type Writable } from 'svelte/store';
import type { ApiKey } from '$lib/common';

export const apiKeyList: Writable<ApiKey[]> = writable();
export const selectedKey: Writable<ApiKey | null> = writable();
export const createdApiKey: Writable<ApiKey | null> = writable();

// Manage Keys modals
export const keyCreateModalOpen = writable(false);
export const keySuccessModalOpen = writable(false);
