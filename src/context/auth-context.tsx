import axios, { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../models/auth-context";
import { AuthTokens } from "../models/auth-tokens";
import { ReactNode } from "../models/react-node";
import { User } from "../models/user";
import { getStoredTokens } from "../utils/auth-tokens";
import { baseURL } from "../utils/urls";

export const authContext = createContext<AuthContext>({
	user: null,
	authTokens: null,
	setUser: () => {},
	setAuthTokens: () => {},
	loginUser: () => {},
	logoutUser: () => {},
});

const AuthContextProvider = ({ children }: ReactNode) => {
	const storedTokens = getStoredTokens();
	const [user, setUser] = useState<User>(() =>
		storedTokens ? jwtDecode(storedTokens?.access) : null
	);
	const [authTokens, setAuthTokens] = useState<AuthTokens>(
		() => storedTokens || null
	);

	const loginUser = async (email: string, password: string) => {
		try {
			const response = await axios.post(`${baseURL}/profiles/token/`, {
				email,
				password,
			});

			setUser(() => {
				const newUser: {
					id: string;
					profile_image: string;
					email: string;
					first_name: string;
					last_name: string;
					status: string;
				} = jwtDecode(response.data.access);

				return {
					id: newUser.id,
					profileImage: newUser.profile_image,
					firstName: newUser.first_name,
					lastName: newUser.last_name,
					email: newUser.email,
					status: newUser.status,
				};
			});
			setAuthTokens(response.data);
			localStorage.setItem("authTokens", JSON.stringify(response.data));
		} catch (error) {
			const axiosError = isAxiosError(error);

			if (axiosError && error.response?.status === 401) {
				toast.error("Akkaunt topilmadi");
			} else {
				toast.error("Noma'lum xatolik yuz berdi");
				console.log(error);
			}
		}
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
