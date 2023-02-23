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
	const login = async (email: string, password: string) => (await httpClient.post<Member>("/login", { email, password })).data;
	const logout = async () => (await httpClient.post<void>("/login/logout")).data;
	const refreshToken = async () => (await httpClient.post(`/login/refresh`)).data;

	/*********** MEMBERS ***********/
	const getMembers = async () => (await httpClient.get<Member[]>("/members")).data;
	const getMember = async (memberId: string) => (await httpClient.get<Member>(`/members/${memberId}`)).data;
	const changeMemberRole = async (memberId: string, role: Role) => (await httpClient.put(`/members/${memberId}`, { role })).data;
	const setPassword = async (memberId: string, password: string) => (await httpClient.put<void>(`/members/${memberId}`, { password })).data;
	const deactivateMember = async (memberId: string) => (await httpClient.put<void>(`/members/${memberId}/deactivate`)).data;
	const sendResetPasswordToken = async (email: string) => (await httpClient.get("/members/password-reset", { params: { email } })).data;
	const resetPassword = async (token: string, password: string) =>
		(await httpClient.post<void>("/members/password-reset", { resetToken: token, password })).data;

	/*********** INVITATIONS ***********/
	const sendInvite = async (email: string, name: string, role: Role) => (await httpClient.post<Invite>("/invites", { email, name, role })).data;
	const acceptInvite = async (inviteId: string, password: string) => (await httpClient.post<Member>(`/invites/${inviteId}`, { password })).data;
	const listInvites = async () => (await httpClient.get<Invite[]>("/invites")).data;
	const getInvite = async (inviteId: string) => (await httpClient.get<Invite>(`/invites/${inviteId}`)).data;
	const resendInvite = async (inviteId: string) => (await httpClient.post<Member>(`/invites/${inviteId}/resend`)).data;
	const changeInviteRole = async (inviteId: string, role: Role) => (await httpClient.put<void>(`/invites/${inviteId}`, { role })).data;
	const revokeInvite = async (inviteId: string) => (await httpClient.put<void>(`/invites/${inviteId}/deactivate`)).data;

	/*********** PLATFORM ***********/
	const createPlatform = async (platformName: string, ownerEmail: string, ownerName: string) =>
		(await httpClient.post<Platform>("/platforms", { platformName, email: ownerEmail, name: ownerName })).data;

	const getPlatform = async () => (await httpClient.get<Platform>(`/platforms`)).data;
	const updatePlatform = async (name: string) => (await httpClient.put<Platform>(`/platforms`, { name })).data;

	/*********** API KEYS ***********/
	const createApiKey = async () => (await httpClient.post<ApiKeyResponse>("/apikeys")).data;
	const listApiKeys = async (limit = 10) => (await httpClient.get<ApiKeyResponse[]>("/apikeys", { params: { limit } })).data;
	const getApiKey = async (keyId: string) => (await httpClient.get<ApiKeyResponse>(`/apikeys/${keyId}`)).data;
	const deactivateApiKey = async (keyId: string) => (await httpClient.put<ApiKeyResponse>(`/apikeys/${keyId}/deactivate`)).data;
	const editApiKey = async (keyId: string, description: string) => (await httpClient.put<ApiKeyResponse>(`/apikeys/${keyId}`, { description })).data;

	/*---------- INTERCEPTORS ----------*/

	httpClient.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (!error.response || !error.response.data) return Promise.reject(_getErrorFromAxiosError(error));

			if ((error.response.status === 401 && error.response.data?.code === "TOKEN_EXPIRED") || error.response.data?.code === "MISSING_TOKEN") {
				const originalRequest = error.config;
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

	return {
		login,
		logout,
		refreshToken,
		getMembers,
		getMember,
		changeMemberRole,
		setPassword,
		deactivateMember,
		sendResetPasswordToken,
		resetPassword,
		sendInvite,
		acceptInvite,
		getInvite,
		listInvites,
		resendInvite,
		changeInviteRole,
		revokeInvite,
		createPlatform,
		getPlatform,
		updatePlatform,
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
	changeMemberRole(memberId: string, role: Role): Promise<void>;
	setPassword(memberId: string, password: string): Promise<void>;
	deactivateMember(memberId: string): Promise<void>;
	sendResetPasswordToken(email: string): Promise<void>;
	resetPassword(token: string, password: string): Promise<void>;

	/* Invitations */
	sendInvite(email: string, name: string, role: Role): Promise<Invite>;
	acceptInvite(inviteId: string, password: string): Promise<Member>;
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
