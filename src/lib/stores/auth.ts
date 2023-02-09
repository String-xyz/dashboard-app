import { writable, type Writable } from "svelte/store";
import type { User } from "./members";

export const loginEmail = writable("");

export const currentUser: Writable<User> = writable();

export enum Role {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export const rolesList = Object.values(Role);

export const isPermissioned = (userRole: Role, minReqRole: Role) => {
	if (userRole == minReqRole) return true;

	if (userRole == Role.OWNER) return true;

	if (userRole == Role.ADMIN && minReqRole !== Role.OWNER) return true;

	return false;
}