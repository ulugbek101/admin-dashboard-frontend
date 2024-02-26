import { NavLink } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'

import { useContext } from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaBookmark } from 'react-icons/fa6'
import { IoSchoolSharp, IoSettings } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { MdGroups, MdOutlineInsights, MdRequestQuote } from 'react-icons/md'
import { authContext } from '../context/AuthContext'

function Navbar() {
	const { user, logoutUser } = useContext(authContext)

	let routes = [
		{
			path: '/subjects',
			icon: <FaBookmark />,
			text: 'Fanlar',
		},
		{
			path: '/groups',
			icon: <MdGroups />,
			text: 'Guruhlar',
		},
		{
			path: '/teachers',
			icon: <FaChalkboardTeacher />,
			text: "O'qituvchilar",
		},
		{
			path: '/pupils',
			icon: <IoSchoolSharp />,
			text: "O'quvchilar",
		},
		{
			path: '/expenses',
			icon: <MdRequestQuote />,
			text: 'Chiqimlar',
		},
		{
			path: '/settings',
			icon: <IoSettings />,
			text: 'Sozlamalar',
		},
		{
			path: '/',
			icon: <MdOutlineInsights />,
			text: 'Analitika',
		},
	]

	if (user?.status !== 'Superadmin') {
		routes.pop()
	}

	return (
		<aside className={styles.aside}>
			<div className={styles.sidebar}>
				{routes.map(route => (
					<NavLink
						key={route.path}
						to={route.path}
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						{route.icon}
						{route.text}
					</NavLink>
				))}

				<NavLink to='' onClick={logoutUser}>
					<LuLogOut />
					Chiqish
				</NavLink>
			</div>
		</aside>
	)
}

export default Navbar
