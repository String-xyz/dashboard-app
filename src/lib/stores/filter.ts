import { writable } from "svelte/store";
import { filterOptions } from "$lib/constants";

export const activeFilter = writable(filterOptions[0]);
