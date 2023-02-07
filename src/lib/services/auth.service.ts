export function createAuthService() {
	async function isUserLoggedIn() {
		// user is logged in when there is a StringJWT cookie set. In the future, we will use a refresh token
		return window.document.cookie.includes('StringJWT');
	}

	return { isUserLoggedIn };
}
