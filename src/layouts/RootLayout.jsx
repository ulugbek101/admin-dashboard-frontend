import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import { authContext } from '../context/auth-context'

const RootLayout = () => {
	const navigate = useNavigate()
	const { user } = useContext(authContext)

	useEffect(() => {
		if (!user) {
			toast.warning('Tizimga kirish talab etiladi')
			navigate('/login')
		}
	}, [user, navigate])

	return !user ? null : (
		<div className='container'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default RootLayout
