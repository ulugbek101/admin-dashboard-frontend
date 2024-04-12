import { useContext } from 'react';
import { authContext } from '../context/auth-context';
import { defaultUserImage } from '../utils/urls';

function Navbar({ openSidebar }) {
	const { user } = useContext(authContext);

	return (
		<nav className='fixed top-0 z-10 flex items-center justify-between w-full px-2 py-4 bg-gray-900'>
			<span
				onClick={() => openSidebar(false)}
				className='text-white material-icons hover:cursor-pointer'
			>
				menu
			</span>
			<div className='flex items-center gap-2'>
				<h4 className='font-bold text-white'>
					{user.last_name.charAt(0)}. {user.first_name}
				</h4>
				<img
					src={user.profile_image ? user.profile_image : defaultUserImage}
					alt={user.full_name}
					className='w-8 rounded-full'
				/>
			</div>
		</nav>
	);
}

export default Navbar;
