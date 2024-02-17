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
	const { logoutUser } = useContext(authContext)

	return (
		<aside className={styles.aside}>
			<div className={styles.sidebar}>
				<NavLink
					to='/subjects'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<FaBookmark />
					Fanlar
				</NavLink>
				<NavLink
					to='/groups'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<MdGroups />
					Guruhlar
				</NavLink>
				<NavLink
					to='/teachers'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<FaChalkboardTeacher />
					O'qituvchilar
				</NavLink>
				<NavLink
					to='pupils'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<IoSchoolSharp />
					O'quvchilar
				</NavLink>
				<NavLink
					to='/'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<MdOutlineInsights />
					Analitika
				</NavLink>
				<NavLink
					to='expenses'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<MdRequestQuote />
					Chiqimlar
				</NavLink>
				<NavLink
					to='settings'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					<IoSettings />
					Sozlamalar
				</NavLink>
				<NavLink to='' onClick={logoutUser}>
					<LuLogOut />
					Chiqish
				</NavLink>
			</div>
		</aside>
	)
}

export default Navbar
