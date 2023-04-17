import { writable, type Writable } from 'svelte/store';
import type { TeamItem } from '$lib/common/types';
import type { Member } from '$lib/services';

export const members: Writable<Member[]> = writable([]);
export const teamItems: Writable<TeamItem[]> = writable([]);
