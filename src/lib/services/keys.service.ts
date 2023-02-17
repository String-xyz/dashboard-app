import { formatDate } from "$lib/utils";

import type { ApiKey } from "$lib/types";
import type { ApiClient } from "./apiClient";

export function createKeysService(apiClient: ApiClient) {

	async function createApiKey(): Promise<ApiKey> {
		const apiKey = await apiClient.createApiKey() as ApiKey;
		apiKey.createdAt = formatDate(apiKey.createdAt);
		apiKey.showFullKey = false;

		return apiKey;
	}

	async function listApiKeys(limit = -1): Promise<ApiKey[]> {
		const apiKeys = await apiClient.listApiKeys(limit) as ApiKey[];
		if (!apiKeys) throw "Could not list API keys";

		for (const apiKey of apiKeys) {
			apiKey.createdAt = formatDate(apiKey.createdAt);
			apiKey.showFullKey = false;
		}

		return apiKeys;
	}

	async function getApiKey(keyId: string): Promise<ApiKey> {
		const apiKey = await apiClient.getApiKey(keyId);
		apiKey.createdAt = formatDate(apiKey.createdAt);

		return apiKey;
	}

	async function deactivateApiKey(keyId: string): Promise<ApiKey> {
		const apiKey = await apiClient.deactivateApiKey(keyId);
		apiKey.createdAt = formatDate(apiKey.createdAt);

		return apiKey;
	}

	async function editApiKey(keyId: string, description: string): Promise<ApiKey> {
		const apiKey = await apiClient.editApiKey(keyId, description);
		apiKey.createdAt = formatDate(apiKey.createdAt);

		return apiKey;
	}

	return { createApiKey, listApiKeys, getApiKey, deactivateApiKey, editApiKey };
}
