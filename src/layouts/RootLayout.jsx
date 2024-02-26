import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import RightSection from '../components/RightSection.jsx'

import { authContext } from '../context/AuthContext.jsx'

import styles from '../styles/RootLayout.module.css'

function RootLayout() {
	const { user } = useContext(authContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user])

	return (
		<div className={styles.container}>
			<Navbar />
			<main className={styles.main}>
				<Outlet />
			</main>
			<RightSection />
		</div>
	)
}

export default RootLayout
