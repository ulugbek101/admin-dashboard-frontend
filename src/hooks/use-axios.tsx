import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { authContext } from "../context/auth-context";
import { baseURL } from "../utils/urls";

const useAxios = () => {
	const { authTokens, setUser, setAuthTokens } = useContext(authContext);

	const axiosInstance = axios.create({
		baseURL,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + authTokens.access,
		},
	});

	axiosInstance.interceptors.request.use(async req => {
		const access = authTokens ? jwtDecode(authTokens.access).exp : null;
		const accessTokenIsExpired = access
			? dayjs.unix(access).diff(dayjs()) < 1
			: true;

		if (!accessTokenIsExpired) return req;

		const response = await axios.post(baseURL + "/profiles/token/refresh/", {
			refresh: authTokens?.refresh,
		});

		localStorage.setItem("authTokens", JSON.stringify(response.data));
		setUser(jwtDecode(response.data.access));
		setAuthTokens(response.data);

		req.headers.Authorization = `Bearer ` + response.data.access;
		return req;
	});

	return axiosInstance;
};

export default useAxios;
