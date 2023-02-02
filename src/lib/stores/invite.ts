import { writable, type Writable } from 'svelte/store';
import { Roles, type User } from '$lib/stores';

interface InviteData extends User {
	platformName: string
}

export const mockinviteduser: InviteData = {
	name: 'James Odin',
	email: 'james@email.com',
	role: Roles.ADMIN,
	platformName: 'Black Mesa'
};

export const inviteId = writable("");

export const invitee: Writable<InviteData> = writable();

// Mock, put this in api client
export const getInviteDataById = (id: string) => {
	if (id == "test") {
		return mockinviteduser;
	}

	throw Error("InvalidInviteID")
}