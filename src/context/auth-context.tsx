import { createContext, useState } from "react";
import { AuthContext } from "../models/auth-context";
import { AuthTokens } from "../models/auth-tokens";
import { ReactNode } from "../models/react-node";
import { User } from "../models/user";

export const authContext = createContext<AuthContext>(null);

const AuthContextProvider = ({ children }: ReactNode) => {
	const [user, setUser] = useState<User>(null);
	const [authTokens, setAuthTokens] = useState<AuthTokens>(null);

	const loginUser = async (email: string, password: string) => {
		// ...
	};
	const logoutUser = () => {};

	const defaultValue: AuthContext = {
		user,
		authTokens,
		setUser,
		setAuthTokens,
		loginUser,
		logoutUser,
	};

	return (
		<authContext.Provider value={defaultValue}>{children}</authContext.Provider>
	);
};

export default AuthContextProvider;
