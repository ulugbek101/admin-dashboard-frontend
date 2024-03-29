import { AuthTokens } from "./auth-tokens";
import { User } from "./user";

export type AuthContext = {
	user: User | null;
	authTokens: AuthTokens | null;
	setUser: (user: User) => void;
	setAuthTokens: (authTokens: AuthTokens) => void;
	loginUser: (email: string, password: string) => void;
	logoutUser: () => void;
};
