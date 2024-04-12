import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { authContext } from '../context/auth-context';

function RootLayout() {
	const { user } = useContext(authContext);
	const [sidebarIsClosed, setSidebarIsClosed] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			toast.error('Tizimga kirish talab etiladi');
			navigate('/login');
		}
	}, [user]);

	return user ? (
		<>
			<Sidebar isClosed={sidebarIsClosed} closeSidebar={setSidebarIsClosed} />
			<Navbar openSidebar={setSidebarIsClosed} />
			<main className='fixed top-0 w-full h-full px-2 py-4 pt-20 overflow-auto'>
				<Outlet />
			</main>
		</>
	) : null;
}

export default RootLayout;
