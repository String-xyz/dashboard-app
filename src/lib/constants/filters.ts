import { Role } from "$lib/common/types";

export enum Filter {
	ALL_MEMBERS = 'all',
	ACTIVE = 'active',
	DELETED = 'deleted',
	PENDING_INVITE = 'pending'
}

export interface FilterOption {
	name: string;
	filter: Filter;
	minPerms?: Role;
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
		filter: Filter.DELETED,
		minPerms: Role.ADMIN
	},
	{
		name: "Pending Invite",
		filter: Filter.PENDING_INVITE
	}
]