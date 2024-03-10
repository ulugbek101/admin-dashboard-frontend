import { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { authContext } from '../context/authContext'
import FlashMessage from '../utils/FlashMessage'

export const RootLayout = () => {
	const { user, logout } = useContext(authContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login/')
		}
	}, [user, navigate])

	const handleLogout = () => {
		logout()
	}

	return (
		<>
			<Link to={'/login'}>Login Page</Link>
			<p onClick={handleLogout}>Logout</p>
			<FlashMessage />
			<Outlet />
		</>
	)
}

export default RootLayout
