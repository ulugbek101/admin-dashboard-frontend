import axios from 'axios'
import { getStoredTokens } from '../context/AuthContext'
import { baseURL } from '../utils/authUtils'

const getAccessToken = () => {
	const tokens = getStoredTokens()
	return tokens?.access || ''
}

const refreshToken = async () => {
	const response = await axiosInstance.post('/profiles/token/refresh/', {
		refresh: getStoredTokens().refresh,
	})
	return response.data
}

const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getAccessToken}`,
	},
})

axiosInstance.interceptors.request.use(request => {
	request.headers['Authorization'] = `Bearer ${getAccessToken()}`
	return request
})

// axiosInstance.interceptors.response.use(
// 	response => {
// 		console.log(response)
// 		return response
// 	},
// 	async error => {
// 		if (error.response.status === 401) {
// 			window.location.reload()
// 		}
// 	}
// )

export default axiosInstance
