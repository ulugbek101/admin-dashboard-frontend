import axios from 'axios'
import getStoredTokens from '../utils/get-token'
import { baseURL } from '../utils/url'

const useAxios = () => {
	const accessToken = getStoredTokens() ? getStoredTokens().access : null

	const axiosInstance = axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + accessToken,
		},
	})

	return axiosInstance
}

export default useAxios
