import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { authContext } from "../context/auth-context";
import { AuthTokens } from "../models/auth-tokens";
import { getStoredTokens } from "../utils/auth-tokens";
import { baseURL } from "../utils/urls";

const useAxios = () => {
	const accessToken: AuthTokens = getStoredTokens()
		? getStoredTokens().access
		: null;
	const { user, authTokens, setUser, setAuthTokens } = useContext(authContext);

	const axiosInstance = axios.create({
		baseURL,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	});

	axiosInstance.interceptors.request.use(async req => {
		const token = accessToken ? jwtDecode(accessToken.access).exp : null;
		const accessTokenIsExpired = token
			? dayjs.unix(token).diff(dayjs()) < 1
			: true;

		if (!accessTokenIsExpired) return req;

		const response = await axios.post(
			baseURL + "/api/v1/profiles/token/refresh/",
			{
				refresh: authTokens.refresh,
			}
		);

		localStorage.setItem("authTokens", JSON.stringify(response.data));
		setUser(jwtDecode(response.data.access));
		setAuthTokens(response.data);

		req.headers.Authorization = `Bearer ` + response.data.access;
		return req;
	});

	return axiosInstance;
};

export default useAxios;
