import axios from 'axios';

export function createApiClient(): ApiClient {
	const baseUrl = import.meta.env.VITE_API_BASE_PATH;
	const commonHeaders = { 'Content-Type': 'application/json'};
	const httpClient = axios.create({
		baseURL: baseUrl,
		headers: commonHeaders,
		withCredentials: true, // send cookies
	});

	/*********** LOGIN ***********/

	async function login(email: string, password: string) {
		const { data } = await httpClient.post<Member>('/login', { email, password });
		return data;
	}

	/*********** MEMBERS ***********/

	async function getMembers() {
		const { data } = await httpClient.get<Member[]>('/members');
		return data;
	}

	async function getMember(memberId: string) {
		const { data } = await httpClient.get<Member>(`/members/${memberId}`);
		return data;
	}

	async function changeMemberRole(memberId: string, role: Role) {
		await httpClient.put(`/members/${memberId}`, { role });
		return;
	}

	async function setPassword(memberId: string, password: string) {
		await httpClient.put(`/members/${memberId}`, { password });
		return;
	}

	async function deactivateMember(memberId: string) {
		await httpClient.put(`/members/${memberId}/deactivate`);
		return;
	}
	
	async function sendResetPasswordToken(email: string) {
		await httpClient.post('/members/password-reset', { email });
		return;
	}

	async function resetPassword(token: string, password: string) {
		await httpClient.post('/members/password-reset', { resetToken: token, password });
		return;
	}

	/*********** INVITATIONS ***********/

	async function sendInvite(email: string, role: Role) {
		const { data } = await httpClient.post<Invite>('/invites', { email, role });
		return data;
	}

	async function acceptInvite(inviteId: string) {
		const { data } = await httpClient.post<Member>(`/invites/${inviteId}/accept`);
		return data;
	}

	async function listInvites(filter: InviteStatus) {
		const params = { filter }
		const { data } = await httpClient.get<Invite[]>('/invites', { params });
		return data;
	}

	async function resendInvite(inviteId: string) {
		const { data } = await httpClient.post<Member>(`/invites/${inviteId}/resend`);
		return data;
	}

	async function changeInviteRole(inviteId: string, role: Role) {
		await httpClient.put(`/invites/${inviteId}/role`, { role });
		return;	
	}

	async function revokeInvite(inviteId: string) {
		const body = { status: 'revoked' };
		await httpClient.put(`/invites/${inviteId}`, body);
		return;
	}

		
	/*********** PLATFORM ***********/

	async function createPlatform(name: string, ownerEmail: string) {
		const { data } = await httpClient.post('/platforms', { name, ownerEmail });
		return data;
	}

	async function getPlatform() {
		const { data } = await httpClient.get<Platform>(`/platforms`);
		return data;
	}

	async function updatePlatform(name: string) {
		const { data } = await httpClient.put<Platform>(`/platforms`, { name });
		return data;
	}

	/*********** API KEYS ***********/

	async function createApiKey() {
		const { data } = await httpClient.post<{ apiKey: ApiKeyResponse }>('/apikeys');
		return data;
	}
	
	async function listApiKeys(limit = 10) {
		const { data } = await httpClient.get<ApiKeyResponse[]>('/apikeys', { params: { limit } });
		return data;
	}

	async function getApiKey(keyId: string) {
		const { data } = await httpClient.get<ApiKeyResponse>(`/apikeys/${keyId}`);
		return data;
	}
	
	async function deactivateApiKey(keyId: string) {
		const { data } = await httpClient.put<ApiKeyResponse>(`/apikeys/${keyId}/deactivate`);
		return data;
	}

	async function editApiKey(keyId: string, description: string) {
		const { data } = await httpClient.put<ApiKeyResponse>(`/apikeys/${keyId}`, { description });
		return data;
	}


	/*---------- HELPERS ----------*/

	function _getErrorFromAxiosError(e: any) {	
		if (e.response) return e.response.data;
		else if (e.request) return e.request;
		else return e.message;
	}

	return {
		login,
		getMembers,
		getMember,
		changeMemberRole,
		setPassword,
		deactivateMember,
		sendResetPasswordToken,
		resetPassword,
		sendInvite,
		acceptInvite,
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
		editApiKey,
	};
}

interface ApiKeyResponse {
	id: string;
	status: string;
	authType: string;
	data: string;
	createdAt: string;
	updatedAt: string;
}

type Invite = {
	id: string;
};

type Platform = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deactivatedAt: string;
	activatedAt: string;
	name: string;
	description: string;
	domains: string[];
	ipAddresses: string[];
};

type Member = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deactivatedAt: string;
	activatedAt: string;
	email: string;
	password: string;
	name: string;
	role: string;
};

type Role = 'member' | 'admin' | 'owner';
type InviteStatus = 'pending' | 'accepted' | 'revoked' | 'expired';

export interface ApiClient {
	/* Login */
	login(email: string, password: string) : Promise<Member>;
	
	/* Members */
	getMembers() : Promise<Member[]>;
	getMember(memberId: string) : Promise<Member>;
	changeMemberRole(memberId: string, role: Role) : Promise<void>;
	setPassword(memberId: string, password: string) : Promise<void>;
	deactivateMember(memberId: string) : Promise<void>;
	sendResetPasswordToken(email: string) : Promise<void>;
	resetPassword(token: string, password: string) : Promise<void>;
		
	/* Invitations */
	sendInvite(email: string, role: Role) : Promise<Invite>;
	acceptInvite(inviteId: string) : Promise<Member>;
	listInvites(filter: InviteStatus) : Promise<Invite[]>;
	resendInvite(inviteId: string) : Promise<Member>;
	changeInviteRole(inviteId: string, role: Role) : Promise<void>;
	revokeInvite(inviteId: string) : Promise<void>;

	/* Platform */
	createPlatform(name: string, ownerEmail: string) : Promise<Platform>;
	getPlatform() : Promise<Platform>;
	updatePlatform(name: string) : Promise<Platform>;
	
	/* Api keys */
	createApiKey: () => Promise<{ apiKey: ApiKeyResponse }>;
	listApiKeys: () => Promise<ApiKeyResponse[]>;
	getApiKey(keyId: string) : Promise<ApiKeyResponse>;
	deactivateApiKey: (keyId: string) => Promise<ApiKeyResponse>;
	editApiKey: (keyId: string, description: string) => Promise<ApiKeyResponse>;
}