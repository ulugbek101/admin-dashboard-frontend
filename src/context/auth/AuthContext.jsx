import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const authContext = createContext({})
const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate()

	const loginUser = async () => {
		navigate('/')
	}
	const logoutUser = () => {
		navigate('/login')
	}

	const contextValue = {
		loginUser,
		logoutUser,
	}
	return (
		<authContext.Provider value={contextValue}>{children}</authContext.Provider>
	)
}

export default AuthContextProvider
