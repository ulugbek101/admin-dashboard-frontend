import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'
import axiosInstance from '../axios/axios'

export const getStoredTokens = () => {
	const storedTokens = localStorage.getItem('authTokens')
	return storedTokens ? JSON.parse(storedTokens) : null
}

export const authContext = createContext()
const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		getStoredTokens() ? jwtDecode(getStoredTokens().access) : null
	)
	const [authTokens, setAuthTokens] = useState(() =>
		getStoredTokens() ? getStoredTokens : null
	)
	const [authError, setAuthError] = useState(null)

	const login = async (email, password) => {
		try {
			const response = await axiosInstance.post('/profiles/token/', {
				email,
				password,
			})

			setUser(prevUser => jwtDecode(response.data.access))
			setAuthTokens(response.data)
			localStorage.setItem('authTokens', JSON.stringify(response.data))
			setAuthError(null)
		} catch (error) {
			switch (error.response?.status) {
				case 401:
					setAuthError('Foydalanuvchi topilmadi')
					break
				default:
					setAuthError('Xatolik, internet sozlamalaringizni tekshiring')
			}
		}
	}

	const logout = () => {
		setUser(null)
		setAuthTokens(null)
		localStorage.removeItem('authTokens')
	}

	const defaultValue = {
		user,
		authTokens,
		authError,
		login,
		logout,
	}
	return (
		<authContext.Provider value={defaultValue}>{children}</authContext.Provider>
	)
}

export default AuthContextProvider
