import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../axios/axios'

export const getStoredTokens = () => {
	const storedTokens = localStorage.getItem('authTokens')
	return storedTokens ? JSON.parse(storedTokens) : null
}

export const authContext = createContext()
const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		getStoredTokens() ? jwtDecode(getStoredTokens()) : null
	)
	const [authTokens, setAuthTokens] = useState(() =>
		getStoredTokens() ? getStoredTokens : null
	)
	const [authMessage, setAuthMessage] = useState(null)

	const login = async (email, password) => {
		try {
			const response = await axiosInstance.post('/profiles/token/', {
				email,
				password,
			})

			setUser(prevUser => {
				const decodedUser = jwtDecode(response.data.access)
				setAuthMessage({
					message: `Assalomu alaykum, ${decodedUser?.first_name} ${decodedUser?.last_name} 👋`,
					type: 'success',
				})
				return decodedUser
			})
			setAuthTokens(response.data)
			toast(authMessage.message)
		} catch (error) {
			console.log('ERROR:', error)
		}
	}

	const logout = () => {
		setUser(prevUser => {
			setAuthMessage({ message: 'Tizimdan chiqdingiz', type: 'success' })
			return null
		})
		setAuthTokens(null)
		setAuthMessage({ message: 'Tizimdan chiqdingiz', type: 'success' })
	}

	const defaultValue = {
		user,
		authTokens,
		authMessage,
		setAuthMessage,
		login,
		logout,
	}
	return (
		<authContext.Provider value={defaultValue}>{children}</authContext.Provider>
	)
}

export default AuthContextProvider
