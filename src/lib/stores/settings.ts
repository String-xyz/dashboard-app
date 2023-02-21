import type { SvelteComponent } from "svelte";
import { writable, type Writable } from "svelte/store";

export enum SettingsTab {
	MY_ACCOUNT,
	PLATFORM_DETAILS,
	CHANGE_PASSWORD,
}

export const activeSettingsTab = writable(SettingsTab.MY_ACCOUNT);

export const tabToViewMap: Writable<Map<SettingsTab, typeof SvelteComponent>> = writable();