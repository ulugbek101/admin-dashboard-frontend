import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getStoredTokens } from "../utils/get-tokens";
import { baseURL } from "../utils/urls";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		getStoredTokens() ? jwtDecode(getStoredTokens().access) : null
	);
	const [authTokens, setAuthTokens] = useState(() =>
		getStoredTokens() ? getStoredTokens() : null
	);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const loginUser = async (email, password) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${baseURL}/token/`,
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setUser(jwtDecode(response.data.access));
			setAuthTokens(response.data);
			navigate("/");
			localStorage.setItem("authTokens", JSON.stringify(response.data));
			toast.success(`Xush kelibsiz, ${user.full_name} 👋`);
		} catch (error) {
			if (error && error.response && error.response.status === 401) {
				toast.error("Foydalanuvchi topilmadi");
			}
			if (error && error.code === "ERR_NETWORK") {
				toast.error("Internetga ulaning");
			}
		}
		setIsLoading(false);
	};
	const updateUser = async (first_name, last_name, email, password) => {
		const route = "teachers";
		const formData = { first_name, last_name, email };
		const successMessage = password
			? "Parol muvaffaqiyatli yangilandi"
			: "Profil ma'lumotlari muvaffaqiyatli yangilandig";
		const errorMessage = password
			? "Parolni yangilashda xatolik yuz berdi"
			: "Profil ma'lumotlarini yangilashda xatolik yuz berdi";

		if (password) {
			formData.password = password;
		}
		try {
			const response = await axios.patch(
				`${baseURL}/${route}/${user.id}/`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authTokens?.access}`,
					},
				}
			);
			setUser(() => response.data);
			toast.success(successMessage);
		} catch (error) {
			toast.error(errorMessage);
		}
	};
	const logoutUser = () => {
		setUser(null);
		setAuthTokens(null);
		toast.success("Tizimdan chiqdingiz");
		localStorage.removeItem("authTokens");
		navigate("/login");
	};

	const defaultValue = {
		user,
		authTokens,
		isLoading,
		updateUser,
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
