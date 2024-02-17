import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'

export const authContext = createContext({})
export const getStoredTokens = () => {
	const storedTokens = localStorage.getItem('authTokens')
	return storedTokens ? JSON.parse(storedTokens) : null
}

const AuthContextProvider = props => {
	const [user, setUser] = useState(() => getStoredTokens()?.access || null)
	const [authTokens, setAuthTokens] = useState(() => getStoredTokens())
	const [authError, setAuthError] = useState(null)

	const loginUser = result => {
		setAuthTokens(result)
		setUser(jwtDecode(result.access))
		localStorage.setItem('authTokens', JSON.stringify(result))
	}

	const logoutUser = () => {
		localStorage.removeItem('authTokens')
		setUser(null)
		setAuthTokens(null)
	}

	const contextData = {
		user: user,
		authTokens: authTokens,
		authError: authError,
		loginUser: loginUser,
		logoutUser: logoutUser,
	}

	return (
		<authContext.Provider value={contextData}>
			{props.children}
		</authContext.Provider>
	)
}

export default AuthContextProvider
