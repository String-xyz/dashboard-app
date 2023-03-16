import { writable, type Writable } from 'svelte/store';
import type { Invite } from '$lib/services';

export const _invite: Writable<Invite> = writable();
export const _inviteToken: Writable<string> = writable();
