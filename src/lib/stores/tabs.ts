import { writable, type Writable } from 'svelte/store';
import type { MenuItem } from '$lib/common';

export const activeTab: Writable<MenuItem> = writable();
