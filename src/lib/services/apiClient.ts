import axios from "axios";
import type { Role } from "$lib/common";

export function createApiClient(): ApiClient {
	const baseUrl = import.meta.env.VITE_API_URL;
	const commonHeaders = { "Content-Type": "application/json" };
	const httpClient = axios.create({
		baseURL: baseUrl,
		headers: commonHeaders,
		withCredentials: true // send cookies
	});

	/*********** ORGANIZATIONS ***********/
	async function createOrganization(organizationName: string, name: string, email: string) {
		return (await httpClient.post<Organization>("/organizations", { organizationName, name, email })).data;
	}

	async function getOrganization() {
		return (await httpClient.get<Organization>("/organizations")).data;
	}

	async function updateOrganization(organizationName?: string, description?: string) {
		return (await httpClient.patch<Organization>("/organizations", { organizationName, description })).data;
	}

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

	/*********** PLATFORM ***********/
	async function createPlatform(platformName: string, platformDescription: string) {
		return (await httpClient.post<Platform>("/platforms", { platformName, platformDescription })).data;
	}

	async function listPlatforms(limit = 0) {
		return (await httpClient.get<Platform[]>("/platforms", { params: { limit } })).data;
	}

	async function getPlatform(platformId: string) {
		return (await httpClient.get<Platform>(`/platforms/${platformId}`)).data;
	}

	async function updatePlatform(platformId: string, request: UpdatePlatform) {
		return (await httpClient.patch<Platform>(`/platforms/${platformId}`, request)).data;
	}

	async function deactivatePlatform(platformId: string) {
		return (await httpClient.patch<Platform>(`/platforms/${platformId}/deactivate`)).data;
	}

	async function reactivatePlatform(platformId: string) {
		return (await httpClient.patch<Platform>(`/platforms/${platformId}/reactivate`)).data;
	}

	/*********** MEMBERS ***********/
	async function getMembers() {
		return (await httpClient.get<Member[]>("/members")).data;
	}

	async function getMember(memberId: string) {
		return (await httpClient.get<Member>(`/members/${memberId}`)).data;
	}

	async function changeSelfName(name: string) {
		return (await httpClient.patch<Member>(`/members`, { name })).data;
	}

	async function changeMemberRole(memberId: string, role: Role) {
		return (await httpClient.patch<Member>(`/members/${memberId}`, { role })).data;
	}

	async function changeSelfPassword(oldPassword: string, newPassword: string) {
		return (await httpClient.patch<Member>(`/members`, { oldPassword, newPassword })).data;
	}

	async function transferOwnership(memberId: string, password: string) {
		return (await httpClient.patch<Member>(`/members/${memberId}/transferOwner`, { password })).data;
	}

	async function deactivateMember(memberId: string) {
		return (await httpClient.patch<Member>(`/members/${memberId}/deactivate`)).data;
	}

	async function reactivateMember(memberId: string) {
		return (await httpClient.patch<Member>(`/members/${memberId}/reactivate`)).data;
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

	async function acceptInvite(inviteId: string, request: AcceptInvite) {
		return (await httpClient.post<Member>(`/invites/${inviteId}`, request)).data;
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
		return (await httpClient.patch<void>(`/invites/${inviteId}`, { role })).data;
	}

	async function revokeInvite(inviteId: string) {
		return (await httpClient.delete<void>(`/invites/${inviteId}`)).data;
	}

	/*********** API KEYS ***********/
	async function createApiKey(platformId = "", keyType = "public") {
		return (await httpClient.post<ApiKeyResponse>(`/apikeys?platformId=${platformId}&type=${keyType}`)).data;
	}

	async function listApiKeys(platformId = "", limit = 0) {
		return (await httpClient.get<ApiKeyResponse[]>(`/apikeys?platformId=${platformId}`, { params: { limit } })).data;
	}

	async function getApiKey(keyId: string) {
		return (await httpClient.get<ApiKeyResponse>(`/apikeys/${keyId}`)).data;
	}

	async function editApiKey(keyId: string, description: string) {
		return (await httpClient.patch<ApiKeyResponse>(`/apikeys/${keyId}`, { description })).data;
	}

	async function deleteApiKey(keyId: string) {
		return (await httpClient.delete<void>(`/apikeys/${keyId}`)).data;
	}

	/*********** CONTRACTS ***********/
	async function listNetworks(limit = 0) {
		return (await httpClient.get<Network[]>(`/networks?limit=${limit}`)).data;
	}

	async function createContract(contract: ContractDetails) {
		return (await httpClient.post<Contract>("/contracts", contract)).data;
	}

	async function listContracts(platformId = "", limit = 0) {
		return (await httpClient.get<Contract[]>(`/contracts?platformId=${platformId}`, { params: { limit } })).data;
	}

	async function getContract(contractId: string) {
		return (await httpClient.get<Contract>(`/contracts/${contractId}`)).data;
	}

	async function editContract(contractId: string, updates: ContractUpdate) {
		return (await httpClient.patch<Contract>(`/contracts/${contractId}`, updates)).data;
	}

	async function deactivateContract(contractId: string) {
		return (await httpClient.patch<Contract>(`/contracts/${contractId}/deactivate`)).data;
	}

	async function reactivateContract(contractId: string) {
		return (await httpClient.patch<Contract>(`/contracts/${contractId}/reactivate`)).data;
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
		/* Organizations */
		createOrganization,
		getOrganization,
		updateOrganization,

		/* Login */
		login,
		logout,
		refreshToken,

		/* Platform */
		createPlatform,
		listPlatforms,
		getPlatform,
		updatePlatform,
		deactivatePlatform,
		reactivatePlatform,

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

		/* API Keys */
		createApiKey,
		listApiKeys,
		getApiKey,
		deleteApiKey,
		editApiKey,

		/* Contracts */
		listNetworks,
		createContract,
		listContracts,
		getContract,
		editContract,
		deactivateContract,
		reactivateContract,
	};
}

export interface ApiClient {
	/* Organizations */
	createOrganization(organizationName: string, ownerName: string, email: string): Promise<Organization>;
	getOrganization(): Promise<Organization>;
	updateOrganization(organizationName?: string, description?: string): Promise<Organization>;

	/* Login */
	login(email: string, password: string): Promise<Member>;
	logout(): Promise<void>;
	refreshToken(): Promise<void>;

	/* Platform */
	createPlatform(platformName: string, platformDescription: string): Promise<Platform>;
	listPlatforms(limit?: number): Promise<Platform[] | null>;
	getPlatform(platformId: string): Promise<Platform>;
	updatePlatform(platformId: string, request: UpdatePlatform): Promise<Platform>;
	deactivatePlatform(platformId: string): Promise<Platform>;
	reactivatePlatform(platformId: string): Promise<Platform>;

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
	acceptInvite(inviteId: string, request: AcceptInvite): Promise<Member>;
	getInvite(inviteId: string): Promise<Invite>;
	listInvites(): Promise<Invite[]>;
	resendInvite(inviteId: string): Promise<Member>;
	changeInviteRole(inviteId: string, role: Role): Promise<void>;
	revokeInvite(inviteId: string): Promise<void>;

	/* API Keys */
	createApiKey(platformId: string, keyType?: string): Promise<ApiKeyResponse>;
	listApiKeys(platformId?: string, limit?: number): Promise<ApiKeyResponse[]>;
	getApiKey(keyId: string): Promise<ApiKeyResponse>;
	deleteApiKey(keyId: string): void;
	editApiKey(keyId: string, description: string): Promise<ApiKeyResponse>;

	/* Contracts */
	listNetworks(): Promise<Network[]>;
	createContract(contract: ContractDetails): Promise<Contract>;
	listContracts(platformId?: string, limit?: number): Promise<Contract[]>;
	getContract(contractId: string): Promise<Contract>;
	editContract(contractId: string, contract: ContractUpdate): Promise<Contract>;
	deactivateContract(contractId: string): Promise<Contract>;
	reactivateContract(contractId: string): Promise<Contract>;
}

export type Organization = {
	id: string;
	createdAt: string;
	deletedAt?: string;
	name: string;
	description: string;
};

export type Member = {
	id: string;
	createdAt: string;
	deactivatedAt?: string;
	deletedAt?: string;
	email: string;
	name: string;
	role: Role;
};

export type Platform = {
	id: string;
	createdAt: string;
	deletedAt?: string;
	deactivatedAt?: string;
	name: string;
	description: string;
	domains: string[];
	ipAddresses: string[];
	organizationId: string;
};

export interface UpdatePlatform {
	platformName?: string;
	description?: string;
	domains?: string[];
	ipAddresses?: string[];
}

/* Invites */

export type InviteStatus = "pending" | "accepted" | "revoked" | "expired" | "invalid";

export type Invite = {
	id: string;
	createdAt: string;
	deletedAt?: string;
	expiredAt?: string;
	email: string;
	name: string;
	role: Role;
	organizationName: string;
	status: InviteStatus;
};

export interface RequestInvite {
	email: string;
	name: string;
	role: Role;
}

export interface AcceptInvite {
	password: string;
	token: string;
}

/* Api Keys */

export interface ApiKeyResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
	type: string;
	data: string;
	hint: string;
	description: string;
	createdBy: string;
	platformId: string;
}

export interface Network {
	id: string;
	name: string;
	chainId: number;
}

// To make the frontend more efficient, eventually I would like the contract endpoints to return the platform names as well
// export interface ShortPlatformInfo {
// 	id: string;
// 	name: string;
// }

export interface Contract {
	id: string;
	createdAt: string;
	updatedAt: string;
	deactivatedAt?: string;
	name: string;
	address: string;
	functions: string[];
	networkId: string;
	platformIds: string[];
	organizationId: string;
}

export interface ContractDetails {
	name: string;
	address: string;
	functions: string[];
	networkId: string;
	platformIds: string[];
}

export interface ContractUpdate {
	name?: string;
	address?: string;
	functions?: string[];
	networkId?: string;
	platformIds?: string[];
}

/* Errors */

export enum ErrorCode {
	BAD_REQUEST = "BAD_REQUEST",
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	NOT_FOUND = "NOT_FOUND",
	CONFLICT = "CONFLICT",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER"
}

export type ApiError = {
	code: ErrorCode;
	message: string;
	details?: {
		invalidParams: InvalidParams[];
	};
};

type InvalidParams = {
	param: string;
	value: string;
	expectedType: string;
	message: string;
};
