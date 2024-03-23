import axios from 'axios'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { authContext } from '../context/auth-context'
import getStoredTokens from '../utils/get-token'
import { baseURL } from '../utils/url'
import { jwtDecode } from 'jwt-decode'

const useAxios = () => {
	const accessToken = getStoredTokens() ? getStoredTokens().access : null
	const { user, authTokens, setUser, setAuthTokens } = useContext(authContext)

	const axiosInstance = axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + accessToken,
		},
	})

	axiosInstance.interceptors.request.use(async req => {
		const accessToken = user.exp
		const accessTokenIsExpired = dayjs.unix(accessToken).diff(dayjs()) < 1

		if (!accessTokenIsExpired) return req

		const response = await axios.post(
			baseURL + '/api/v1/profiles/token/refresh/',
			{
				refresh: authTokens.refresh,
			}
		)

		localStorage.setItem('authTokens', JSON.stringify(response.data))
		setUser(jwtDecode(response.data.access))
		setAuthTokens(response.data)

		req.headers.Authorization = `Bearer ` + response.data.access
		return req
	})

	return axiosInstance
}

export default useAxios
