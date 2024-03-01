import axios from 'axios'
import { getStoredTokens } from '../context/authContext'

export const baseURL = 'http://localhost:8000/api/v1'
export const baseMediaURL = 'http://localhost:8000'

const getTokens = () => getStoredTokens()

const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		Authorization: `Bearer ${getTokens?.access}`,
	},
})

export default axiosInstance
