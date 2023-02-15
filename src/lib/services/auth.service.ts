import type { ApiClient, Invite, Member } from "./apiClient";
import { Role } from "$lib/types";

export function createAuthService(apiClient: ApiClient) {

	async function login(email: string, pwd: string): Promise<Member> {
		const member = await apiClient.login(email, pwd);
		return member;
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

	async function acceptInvite(invite: Invite, password: string): Promise<Member> {
		const newMember = await apiClient.acceptInvite(invite.id, password);

		// Because acceptInvite doesn't return Role
		newMember.role = invite.role;

		return newMember;
	}

	async function logout() {
		try {
			await apiClient.logout();
			window.location.href = '/';
			localStorage.removeItem('user');
		} catch (e) {
			console.error(e);
		}
			
	}

	const isPermissioned = (userRole: Role, minReqRole: Role) => {
		if (userRole == minReqRole) return true;
		if (userRole == Role.OWNER) return true;
		if (userRole == Role.ADMIN && minReqRole !== Role.OWNER) return true;
	
		return false;
	}
	
	return { login, logout, isUserLoggedIn, getInviteById, acceptInvite, isPermissioned };
}
