import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import getStoredTokens from '../utils/get-token'
import { baseURL } from '../utils/url'

export const authContext = createContext({
	user: null,
	authTokens: null,
	setUser: () => {},
	setAuthTokens: () => {},
	loginUser: () => {},
	logoutUser: () => {},
})

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		getStoredTokens() ? jwtDecode(getStoredTokens().access) : null
	)
	const [authTokens, setAuthTokens] = useState(() =>
		getStoredTokens() ? getStoredTokens() : null
	)
	const navigate = useNavigate()

	const loginUser = async (email, password) => {
		try {
			const response = await axios.post(baseURL + 'profiles/token/', {
				email,
				password,
			})
			localStorage.setItem('authTokens', JSON.stringify(response.data))
			setUser(jwtDecode(response.data.access))
			setAuthTokens(response.data)
			navigate('/')
		} catch (error) {
			if (error.response?.status === 401) {
				toast.error('Akkaunt topilmadi')
			} else {
				console.log(error)
			}
		}
	}
	const logoutUser = () => {
		setUser(null)
		setAuthTokens(null)
		localStorage.removeItem('authTokens')
		navigate('/login')
	}

	const contextValues = {
		user,
		authTokens,
		loginUser,
		logoutUser,
		setUser,
		setAuthTokens,
	}
	return (
		<authContext.Provider value={contextValues}>
			{children}
		</authContext.Provider>
	)
}

export default AuthContextProvider
