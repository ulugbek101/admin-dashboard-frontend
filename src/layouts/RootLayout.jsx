import { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
		toast('Tizimdan chiqdingiz')
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
