import { writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';

export const activeModal: Writable<typeof SvelteComponent | null> = writable();