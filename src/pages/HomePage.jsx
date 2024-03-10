import { useContext } from 'react'
import { authContext } from '../context/auth/AuthContext'

const HomePage = () => {
	const { logoutUser } = useContext(authContext)

	return (
		<>
			<h1>Home page</h1>
			<button onClick={logoutUser}>Logout</button>
		</>
	)
}

export default HomePage
