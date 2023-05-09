import { get as getStore } from "svelte/store";
import { currentUser } from "$lib/stores";
import { formatDate } from "$lib/utils";
import { Role } from "$lib/common";
import { authService } from ".";

import type { ApiKey } from "$lib/common";
import type { ApiClient } from "./apiClient";

export function createKeysService(apiClient: ApiClient) {

	async function createApiKey(platformId = "", keyType = "public"): Promise<ApiKey> {
		const apiKey = await apiClient.createApiKey(platformId, keyType) as ApiKey;
		apiKey.createdAt = formatDate(apiKey.createdAt);
		apiKey.showFullKey = false;

		return apiKey;
	}

	async function listApiKeys(platformId?: string, limit = 0): Promise<ApiKey[]> {
		const apiKeys = (await apiClient.listApiKeys(platformId, limit)) as ApiKey[] ?? [];
		if (!apiKeys) throw "Could not list API keys";

		const publicKeys = [];
		const secretKeys = [];

		const userRole = getStore(currentUser).role;

		for (const apiKey of apiKeys.reverse()) {
			apiKey.createdAt = formatDate(apiKey.createdAt);
			apiKey.showFullKey = false;

			if (apiKey.type === "public") {
				publicKeys.push(apiKey);
			} else if (apiKey.type === "secret" && authService.canView(userRole, Role.ADMIN)) {
				secretKeys.push(apiKey);
			}
		}

		return [...secretKeys, ...publicKeys];
	}

	async function getApiKey(keyId: string): Promise<ApiKey> {
		const apiKey = await apiClient.getApiKey(keyId);
		apiKey.createdAt = formatDate(apiKey.createdAt);

		return apiKey;
	}

	async function deleteApiKey(keyId: string): Promise<ApiKey> {
		const apiKey = await apiClient.deleteApiKey(keyId);
		apiKey.createdAt = formatDate(apiKey.createdAt);

		return apiKey;
	}

	async function editApiKey(keyId: string, description: string): Promise<ApiKey> {
		const apiKey = await apiClient.editApiKey(keyId, description);
		apiKey.createdAt = formatDate(apiKey.createdAt);

		return apiKey;
	}

	return { createApiKey, listApiKeys, getApiKey, deleteApiKey, editApiKey };
}
