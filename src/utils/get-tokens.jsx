export const getStoredTokens = () => {
	const authTokens = localStorage.getItem('authTokens');
	if (!authTokens) return null;
	return JSON.parse(authTokens);
};
