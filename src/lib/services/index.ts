import { createApiClient } from "./apiClient";
import { createAuthService } from "./auth.service";
import { createTeamService } from "./team.service";

export const apiClient = createApiClient();
export const authService = createAuthService(apiClient);
export const teamService = createTeamService(apiClient);

export * from "./apiClient"; // mostly for types