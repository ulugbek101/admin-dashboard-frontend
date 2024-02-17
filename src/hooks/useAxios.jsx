import axios from 'axios'
import { useContext } from 'react'
import { authContext } from '../context/AuthContext.jsx'

function useAxios() {
	const { authTokens, logoutUser, loginUser } = useContext(authContext)
	const baseURL = 'http://localhost:8000/api/v1'

	const axiosInstance = axios.create({
		baseURL: baseURL,
		headers: {
			Authorization: `Bearer ${authTokens?.access}`,
		},
	})

	axiosInstance.interceptors.response.use(
		response => response,
		async error => {
			const originalRequest = error.config

			// Check if the error due to an expired token
			if (
				error.response &&
				error.response.status === 401 &&
				!originalRequest._retry
			) {
				originalRequest._retry = true

				try {
					// Attempt to refresh token
					const result = await refreshToken()
					loginUser(result)

					// Retry the original request with the new token
					print(authTokens.refresh)
					originalRequest.headers[
						'Authorization'
					] = `Bearer ${authTokens.refresh}`
					return axios(originalRequest)
				} catch (refreshError) {
					logoutUser()
					return Promise.reject(refreshError)
				}
			}

			return Promise.reject(error)
		}
	)

	// Function to refresh the authentication token
	const refreshToken = async () => {
		const response = await axios.post('profiles/token/refresh/', {
			refresh: authTokens.refresh,
		})
		return response.data
	}

	return axiosInstance
}

export default useAxios
