import type { SvelteComponent } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export const activeModal: Writable<typeof SvelteComponent | null> = writable();
