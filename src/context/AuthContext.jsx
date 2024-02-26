import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'

export const authContext = createContext({})
export const getStoredTokens = () => {
	const storedTokens = localStorage.getItem('authTokens')
	return storedTokens ? JSON.parse(storedTokens) : null
}

const AuthContextProvider = props => {
	const [user, setUser] = useState(() => getStoredTokens()?.access || null)
	const [authTokens, setAuthTokens] = useState(() => getStoredTokens())
	const [authError, setAuthError] = useState(null)

	useEffect(() => {
		if (user) {
			loginUser(authTokens)
		}
	}, [])

	const loginUser = responseData => {
		setAuthTokens(responseData)
		setUser(jwtDecode(responseData.access))
		localStorage.setItem('authTokens', JSON.stringify(responseData))
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
		name: 'Alex',
	}

	return (
		<authContext.Provider value={contextData}>
			{props.children}
		</authContext.Provider>
	)
}

export default AuthContextProvider
