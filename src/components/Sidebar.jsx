import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../context/auth-context';

function Sidebar({ isClosed, closeSidebar }) {
	const { logoutUser } = useContext(authContext);

	return (
		<aside
			className={`absolute z-20 w-full h-full bg-gray-900 px-2 py-4 ${
				isClosed && '-translate-x-[100%]'
			} transition flex flex-col gap-8`}
		>
			<div className='flex items-center justify-between'>
				<img
					src='https://shams-school.uz/static/custom-images/favicon.png'
					alt='Shams XM logo'
					className='rounded-full'
				/>
				<span
					onClick={() => {
						closeSidebar(true);
					}}
					className='text-white material-icons hover:cursor-pointer'
				>
					close
				</span>
			</div>
			<div className='flex flex-col h-full gap-2 font-bold text-white'>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>import_contacts</span>
					Fanlar
				</NavLink>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>groups</span>
					Guruhlar
				</NavLink>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>assignment_ind</span>
					O'qituvchilar
				</NavLink>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>school</span>
					O'quvchilar
				</NavLink>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>insights</span>
					Analitika
				</NavLink>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>file_download</span>
					Statistikani yuklash
				</NavLink>
				<NavLink
					to='/subjects'
					className={({isActive}) => `${isActive && 'ms-1 bg-gradient-to-l from-white'} flex items-center gap-2 py-2 rounded`}
				>
					<span className='material-icons'>event</span>
					To'lovlar
				</NavLink>
				<NavLink
					to='/subjects'
					className='flex items-center gap-2 py-2 rounded'
				>
					<span className='material-icons'>request_quote</span>
					Chiqimlar
				</NavLink>
				<NavLink
					to='/'
					className={({isActive}) => `${isActive && 'ms-1 bg-gradient-to-l from-white'} flex items-center gap-2 py-2 rounded`}
				>
					<span className='material-icons'>person</span>
					Shaxsiy kabinet
				</NavLink>
				<div
					onClick={logoutUser}
					className='flex items-center gap-2 py-2 mt-auto rounded'
				>
					<span className='material-icons'>logout</span>
					Chiqish
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
