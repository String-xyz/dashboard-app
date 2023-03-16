import type { ApiClient, Invite, Member } from "./apiClient";
import { Role } from "$lib/types";

export function createAuthService(apiClient: ApiClient) {
	async function login(email: string, pwd: string): Promise<Member> {
		const member = await apiClient.login(email, pwd);
		return member;
	}

	async function isUserLoggedIn(): Promise<boolean> {
		try {
			await apiClient.refreshToken();
			console.debug("User is logged in");
			return true;
		} catch (e) {
			return false;
		}
	}

	async function getInviteById(inviteId: string): Promise<Invite> {
		const invite = await apiClient.getInvite(inviteId);
		if (!invite) {
			throw new Error("Invalid invite");
		}

		return invite;
	}

	async function acceptInvite(invite: Invite, password: string, token: string): Promise<Member> {
		const newMember = await apiClient.acceptInvite(invite.id, password, token);
		// Because acceptInvite doesn't return Role
		newMember.role = invite.role;

		return newMember;
	}

	async function logout() {
		try {
			await apiClient.logout();
			localStorage.removeItem("user");
			window.location.href = "/login";
		} catch (e) {
			console.error(e);
		}
	}

	const canModify = (userRole: Role, targetRole: Role) => {
		if (userRole == Role.OWNER) return true;
		if (userRole == Role.ADMIN && targetRole == Role.MEMBER) return true;

		return false;
	};

	const canView = (userRole: Role, minPerms: Role) => {
		if (userRole == minPerms) return true;
		if (userRole == Role.OWNER) return true;
		if (userRole == Role.ADMIN && minPerms !== Role.OWNER) return true;

		return false;
	};

	return { login, logout, isUserLoggedIn, getInviteById, acceptInvite, canModify, canView };
}
