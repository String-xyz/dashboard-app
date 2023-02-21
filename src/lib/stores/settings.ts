import { writable } from "svelte/store";

export enum SettingsTab {
	MY_ACCOUNT,
	PLATFORM_DETAILS,
	CHANGE_PASSWORD,
}

export const activeSettingsTab = writable(SettingsTab.MY_ACCOUNT)