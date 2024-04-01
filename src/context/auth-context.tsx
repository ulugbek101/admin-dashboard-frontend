import axios, { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../models/auth-context";
import { AuthTokens } from "../models/auth-tokens";
import { ReactNode } from "../models/react-node";
import { User } from "../models/user";
import { getStoredTokens } from "../utils/auth-tokens";
import { baseURL } from "../utils/urls";

const emptyUser = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	profileImage: "",
	status: "",
	isStaff: false,
	isSuperuser: false,
};

const emptyTokens = {
	access: "",
	refresh: "",
};

export const authContext = createContext<AuthContext>({
	user: emptyUser,
	authTokens: emptyTokens,
	setUser: () => {},
	setAuthTokens: () => {},
	loginUser: () => {},
	logoutUser: () => {},
});

const AuthContextProvider = ({ children }: ReactNode) => {
	const storedTokens = getStoredTokens();
	const [user, setUser] = useState<User>(
		storedTokens ? jwtDecode(storedTokens.access) : emptyUser
	);
	const [authTokens, setAuthTokens] = useState<AuthTokens>(
		storedTokens ? storedTokens : emptyTokens
	);
	const navigate = useNavigate();

	const loginUser = async (email: string, password: string) => {
		try {
			const response = await axios.post(`${baseURL}/profiles/token/`, {
				email,
				password,
			});

			setUser(jwtDecode(response.data.access));
			setAuthTokens(response.data);
			localStorage.setItem("authTokens", JSON.stringify(response.data));
			navigate("/");
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

	const logoutUser = () => {
		setUser(emptyUser);
		setAuthTokens(emptyTokens);
		localStorage.removeItem("authTokens");
		navigate("/login");
	};

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
