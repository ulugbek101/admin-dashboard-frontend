import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { authContext } from '../context/auth-context'
import { navLinks } from '../utils/nav-links'

const Navbar = () => {
	const { logoutUser } = useContext(authContext)

	return (
		<aside>
			<div className='toggle'>
				<div className='logo'>
					<img
						src='https://shams-school.uz/static/favicon.png'
						style={{ borderRadius: '50%' }}
						alt='Logo'
					/>
					<h2>
						SHAMS<span className='danger'>XM</span>
					</h2>
				</div>
				<div className='close' id='close-btn'>
					<span className='material-icons-sharp'>close</span>
				</div>
			</div>

			<div className='sidebar'>
				{navLinks.map((link, index) => (
					<NavLink
						key={index}
						to={link.link}
						className={({ isActive }) => (isActive ? 'active' : '')}
					>
						<span className='material-icons-sharp'>{link.icon}</span>
						{link.text}
					</NavLink>
				))}
				<Link onClick={logoutUser} to='#!'>
					<span className='material-icons-sharp'>logout</span>
					Chiqish
				</Link>
			</div>
		</aside>
	)
}

export default Navbar
