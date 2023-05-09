import { writable, type Writable } from 'svelte/store';
import type { ApiKey } from '$lib/common';

// Manage Keys Modals
export const keyCreateModalOpen = writable(false);
export const keySuccessModalOpen = writable(false);

export const createdApiKey: Writable<ApiKey | null> = writable();

export const selectedKey: Writable<ApiKey | null> = writable();
export const apiKeyList: Writable<ApiKey[]> = writable();

