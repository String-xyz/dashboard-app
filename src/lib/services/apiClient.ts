import axios from "axios";
import type { Role } from "$lib/types";

export function createApiClient(): ApiClient {
	const baseUrl = import.meta.env.VITE_API_URL;
	const commonHeaders = { "Content-Type": "application/json" };
	const httpClient = axios.create({
		baseURL: baseUrl,
		headers: commonHeaders,
		withCredentials: true // send cookies
	});

	/*********** LOGIN ***********/
	async function login(email: string, password: string) {
		return (await httpClient.post<Member>("/login", { email, password })).data;
	}

	async function logout() {
		return (await httpClient.post<void>("/login/logout")).data;
	}

	async function refreshToken() {
		return (await httpClient.post(`/login/refresh`)).data;
	}

	/*********** MEMBERS ***********/
	async function getMembers() {
		return (await httpClient.get<Member[]>("/members")).data;
	}

	async function getMember(memberId: string) {
		return (await httpClient.get<Member>(`/members/${memberId}`)).data;
	}

	async function changeSelfName(name: string) {
		return (await httpClient.put<Member>(`/members`, { name })).data;
	}

	async function changeMemberRole(memberId: string, role: Role) {
		return (await httpClient.put<Member>(`/members/${memberId}`, { role })).data;
	}

	async function changeSelfPassword(oldPassword: string, newPassword: string) {
		return (await httpClient.put<Member>(`/members`, { oldPassword, newPassword })).data;
	}

	async function transferOwnership(memberId: string, password: string) {
		return (await httpClient.put<Member>(`/members/${memberId}/transferOwner`, { password })).data;
	}

	async function deactivateMember(memberId: string) {
		return (await httpClient.put<Member>(`/members/${memberId}/deactivate`)).data;
	}

	async function reactivateMember(memberId: string) {
		return (await httpClient.put<Member>(`/members/${memberId}/reactivate`)).data;
	}

	async function sendResetPasswordToken(email: string) {
		return (await httpClient.get("/members/password-reset", { params: { email } })).data;
	}

	async function resetPassword(token: string, password: string) {
		return (await httpClient.post<void>("/members/password-reset", { resetToken: token, password })).data;
	}

	/*********** INVITATIONS ***********/
	async function sendInvite(email: string, name: string, role: Role) {
		return (await httpClient.post<Invite>("/invites", { email, name, role })).data;
	}

	async function acceptInvite(inviteId: string, password: string, token: string) {
		return (await httpClient.post<Member>(`/invites/${inviteId}`, { password, token })).data;
	}

	async function listInvites() {
		return (await httpClient.get<Invite[]>("/invites")).data;
	}

	async function getInvite(inviteId: string) {
		return (await httpClient.get<Invite>(`/invites/${inviteId}`)).data;
	}

	async function resendInvite(inviteId: string) {
		return (await httpClient.post<Member>(`/invites/${inviteId}/resend`)).data;
	}

	async function changeInviteRole(inviteId: string, role: Role) {
		return (await httpClient.put<void>(`/invites/${inviteId}`, { role })).data;
	}

	async function revokeInvite(inviteId: string) {
		return (await httpClient.put<void>(`/invites/${inviteId}/deactivate`)).data;
	}

	/*********** PLATFORM ***********/
	async function createPlatform(platformName: string, ownerEmail: string, ownerName: string) {
		return (await httpClient.post<Platform>("/platforms", { platformName, email: ownerEmail, name: ownerName })).data;
	}

	async function getPlatform() {
		return (await httpClient.get<Platform>(`/platforms`)).data;
	}

	async function updatePlatform(name: string) {
		return (await httpClient.put<Platform>(`/platforms`, { name })).data;
	}

	/*********** API KEYS ***********/
	async function createApiKey(keyType = "public") {
		return (await httpClient.post<ApiKeyResponse>("/apikeys", { type: keyType })).data;
	}

	async function listApiKeys(limit = 10) {
		return (await httpClient.get<ApiKeyResponse[]>("/apikeys", { params: { limit } })).data;
	}

	async function getApiKey(keyId: string) {
		return (await httpClient.get<ApiKeyResponse>(`/apikeys/${keyId}`)).data;
	}

	async function deactivateApiKey(keyId: string) {
		return (await httpClient.put<ApiKeyResponse>(`/apikeys/${keyId}/deactivate`)).data;
	}

	async function editApiKey(keyId: string, description: string) {
		return (await httpClient.put<ApiKeyResponse>(`/apikeys/${keyId}`, { description })).data;
	}

	/*---------- INTERCEPTORS ----------*/

	httpClient.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (!error.response || !error.response.data) return Promise.reject(_getErrorFromAxiosError(error));

			const originalRequest = error.config;

			if (error.response.status === 401 && !_isRefreshTokenRequest(originalRequest)) {
				try {
					const data = await refreshToken();

					// retry the original request with the new access token
					originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
					return httpClient(originalRequest);
				} catch (e: any) {
					console.error("refresh token error:", _getErrorFromAxiosError(e));

					// if the refresh token is expired, redirect to login
					window.location.href = "/login";

					return Promise.reject(_getErrorFromAxiosError(e));
				}
			}

			return Promise.reject(_getErrorFromAxiosError(error));
		}
	);

	/*---------- HELPERS ----------*/

	function _getErrorFromAxiosError(e: any) {
		if (e.response) return e.response.data;
		else if (e.request) return e.request;
		else return e.message;
	}

	function _isRefreshTokenRequest(request: any) {
		return request.url === "/login/refresh";
	}

	return {
		/* Login */
		login,
		logout,
		refreshToken,

		/* Members */
		getMembers,
		getMember,
		changeSelfName,
		changeMemberRole,
		changeSelfPassword,
		transferOwnership,
		deactivateMember,
		reactivateMember,
		sendResetPasswordToken,
		resetPassword,

		/* Invites */
		sendInvite,
		acceptInvite,
		getInvite,
		listInvites,
		resendInvite,
		changeInviteRole,
		revokeInvite,

		/* Platform */
		createPlatform,
		getPlatform,
		updatePlatform,

		/* API Keys */
		createApiKey,
		listApiKeys,
		getApiKey,
		deactivateApiKey,
		editApiKey
	};
}

export interface ApiClient {
	/* Login */
	login(email: string, password: string): Promise<Member>;
	logout(): Promise<void>;
	refreshToken(): Promise<void>;

	/* Members */
	getMembers(): Promise<Member[]>;
	getMember(memberId: string): Promise<Member>;
	changeSelfName(name: string): Promise<Member>;
	changeMemberRole(memberId: string, role: Role): Promise<Member>;
	changeSelfPassword(oldPassword: string, newPassword: string): Promise<Member>;
	transferOwnership(memberId: string, password: string): Promise<Member>;
	deactivateMember(memberId: string): Promise<Member>;
	reactivateMember(memberId: string): Promise<Member>;
	sendResetPasswordToken(email: string): Promise<void>;
	resetPassword(token: string, password: string): Promise<void>;

	/* Invitations */
	sendInvite(email: string, name: string, role: Role): Promise<Invite>;
	acceptInvite(inviteId: string, password: string, token: string): Promise<Member>;
	getInvite(inviteId: string): Promise<Invite>;
	listInvites(): Promise<Invite[]>;
	resendInvite(inviteId: string): Promise<Member>;
	changeInviteRole(inviteId: string, role: Role): Promise<void>;
	revokeInvite(inviteId: string): Promise<void>;

	/* Platform */
	createPlatform(platformName: string, ownerEmail: string, ownerName: string): Promise<Platform>;
	getPlatform(): Promise<Platform>;
	updatePlatform(name: string): Promise<Platform>;

	/* Api keys */
	createApiKey: () => Promise<ApiKeyResponse>;
	listApiKeys: (limit?: number) => Promise<ApiKeyResponse[]>;
	getApiKey(keyId: string): Promise<ApiKeyResponse>;
	deactivateApiKey: (keyId: string) => Promise<ApiKeyResponse>;
	editApiKey: (keyId: string, description: string) => Promise<ApiKeyResponse>;
}

export interface ApiKeyResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
	deactivatedAt?: string;
	type: string;
	data: string;
	description: string;
	createdBy: string;
	platformId: string;
}

export type Platform = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deactivatedAt?: string;
	activatedAt: string;
	name: string;
	description: string;
	domains: string[];
	ipAddresses: string[];
};

export type Member = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deactivatedAt?: string;
	email: string;
	name: string;
	role: Role;
};

export type InviteStatus = "pending" | "accepted" | "revoked" | "expired" | "invalid";

export type Invite = {
	id: string;
	name: string;
	email: string;
	role: Role;
	platformName: string;
	status: InviteStatus;
	acceptedAt?: string;
	expiredAt?: string;
	deactivatedAt?: string;
};

export enum ErrorCodes {
	BAD_REQUEST = "BAD_REQUEST",
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	NOT_FOUND = "NOT_FOUND",
	CONFLICT = "CONFLICT",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER"
}
