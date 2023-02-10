import { apiClient, type Invite } from ".";
import type { User } from "$lib/stores";

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;

export function createAuthService() {

	async function login(email: string, pwd: string): Promise<User> {
		const member = await apiClient.login(email, pwd);
		const joinDate = new Date(member.createdAt).toLocaleDateString('en-US', dateOptions);

		return {...member, joinDate, self: true}
	}

	async function isUserLoggedIn(): Promise<boolean> {
		// user is logged in when there is a StringJWT cookie set. In the future, we will use a refresh token
		return window.document.cookie.includes('StringJWT');
	}

	async function getInviteById(inviteId: string): Promise<Invite> {
		const invite = await apiClient.getInvite(inviteId);
		if (!invite) {
			throw new Error('Invalid invite');
		}

		return invite;
	}

	async function acceptInvite(invite: Invite, password: string): Promise<User> {
		const newMember = await apiClient.acceptInvite(invite.id, password);
		const joinDate = new Date(newMember.createdAt).toLocaleDateString('en-US', dateOptions);
		// Because acceptInvite doesn't return Role
		newMember.role = invite.role;

		return {...newMember, joinDate, self: true}
	}

	return { login, isUserLoggedIn, getInviteById, acceptInvite };
}
