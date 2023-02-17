import { writable, type Writable } from 'svelte/store';
import type { ApiKeyResponse } from '$lib/services';

export const apiKeyList: Writable<ApiKeyResponse[]> = writable();

export const createdApiKey: Writable<ApiKeyResponse> = writable();