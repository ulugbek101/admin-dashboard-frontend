import { AuthTokens } from "./auth-tokens";
import { User } from "./user";

export type AuthContext = {
	user: User | null;
	authTokens: AuthTokens;
	loginUser: (authTokens: AuthTokens) => void;
	logoutUser: () => void;
} | null;
