import { createContext, useState } from "react";
import { AuthContext } from "../models/auth-context";
import { AuthTokens } from "../models/auth-tokens";
import { ReactNode } from "../models/react-node";
import { User } from "../models/user";

const authContext = createContext<AuthContext>(null);

const AuthContextProvider = ({ children }: ReactNode) => {
	const [user, setUser] = useState<User>(null);
	const [authTokens, setAuthTokens] = useState<AuthTokens>(null);

	const loginUser = async (authTokens: AuthTokens) => {};
	const logoutUser = () => {};

	const defaultValue: AuthContext = {
		user,
		authTokens,
		loginUser,
		logoutUser,
	};

	return (
		<authContext.Provider value={defaultValue}>{children}</authContext.Provider>
	);
};

export default AuthContextProvider;
