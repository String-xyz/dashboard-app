import { createApiClient } from "./apiClient";
import { createAuthService } from "./auth.service";

export const apiClient = createApiClient();
export const authService = createAuthService();

export * from "./apiClient"; // mostly for types