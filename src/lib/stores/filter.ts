import { writable } from "svelte/store";

export enum Filter {
	ALL_MEMBERS = 'all',
	ACTIVE = 'active',
	DELETED = 'deleted',
	PENDING_INVITE = 'pending'
}

export interface FilterOption {
	name: string;
	filter: Filter;
}

export const filterOptions: FilterOption[] = [
	{
		name: "All Members",
		filter: Filter.ALL_MEMBERS
	},
	{
		name: "Active",
		filter: Filter.ACTIVE
	},
	{
		name: "Deleted",
		filter: Filter.DELETED
	},
	{
		name: "Pending Invite",
		filter: Filter.PENDING_INVITE
	}
]

export const activeFilter = writable(filterOptions[0]);
