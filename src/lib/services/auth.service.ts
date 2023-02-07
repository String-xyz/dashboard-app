export function createAuthService() {
	async function isUserLoggedIn() {
		// TODO: temporary solution for development. Replace with real auth check (e.g refresh token)
		const loggedIn = localStorage.getItem('loggedIn');
		return loggedIn ? true : false;
	}

	return { isUserLoggedIn };
}
