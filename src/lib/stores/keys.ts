import { writable, type Writable } from 'svelte/store';
import type { ApiKey } from '$lib/common/types';

export const apiKeyList: Writable<ApiKey[]> = writable();

export const createdApiKey: Writable<ApiKey | null> = writable();

export const editKey: Writable<ApiKey | null> = writable();