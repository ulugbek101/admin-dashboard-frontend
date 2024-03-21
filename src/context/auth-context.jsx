import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAxios from '../hooks/use-axios'
import getStoredTokens from '../utils/get-token'

export const authContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		getStoredTokens() ? jwtDecode(getStoredTokens().access) : null
	)
	const [authTokens, setAuthTokens] = useState(() =>
		getStoredTokens() ? getStoredTokens() : null
	)
	const navigate = useNavigate()
	const axiosInstance = useAxios()

	const loginUser = async (email, password) => {
		try {
			const response = await axiosInstance.post('/api/v1/profiles/token/', {
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
		// toast.success(`Xush kelibsiz ${user.first_name} ${user.last_name} !`)
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
