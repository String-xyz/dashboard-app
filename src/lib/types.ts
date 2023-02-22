import type { ApiKeyResponse } from "./services";

export enum Role {
	MEMBER = 'Member',
	ADMIN = 'Admin',
	OWNER = 'Owner'
}

export interface PlatformDetails {
	id: string;
	name: string;
	ownerName: string;
	ownerEmail: string;
	domain: string;
	isVerified: boolean;
}

export type TeamItem = {
	id: string;
	name: string;
	role: Role;
	email: string;
	status: string;
	isInvite?: boolean; // is this an invite?
	self?: boolean; // is this the current user?
	joinDate?: string; // member - invites don't have a join date
	deactivatedAt?: string; // member
}

export interface ApiKey extends ApiKeyResponse {
	showFullKey?: boolean; // For UI
}
