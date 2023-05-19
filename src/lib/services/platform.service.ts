import type { ApiClient, Platform } from "./apiClient";

export function createPlatformService(apiClient: ApiClient) {
	async function createPlatform(name: string, desc: string): Promise<Platform> {
		const platform = await apiClient.createPlatform(name, desc);

		return platform;
	}

	async function listPlatforms(): Promise<Platform[]> {
		const platforms = await apiClient.listPlatforms();
		// TODO: Remove null check once backend returns empty array instead of null
		if (!platforms) {
			return [] as Platform[];
		}

		return platforms.reverse();
	}

	async function getPlatform(platformId: string): Promise<Platform> {
		const platform = await apiClient.getPlatform(platformId);

		return platform;
	}

	async function updatePlatform(id: string, name: string, desc: string) {
		const platform = await apiClient.updatePlatform(id, { platformName: name, description: desc });

		return platform;
	}

	async function deactivatePlatform(id: string) {
		return apiClient.deactivatePlatform(id);
	}

	async function reactivatePlatform(id: string) {
		return apiClient.reactivatePlatform(id);
	}

	return { createPlatform, listPlatforms, getPlatform, updatePlatform, deactivatePlatform, reactivatePlatform };
}
