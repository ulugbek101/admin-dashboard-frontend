import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/auth-context';

function RootLayout() {
	const { user } = useContext(authContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			toast.error('Tizimga kirish talab etiladi');
			navigate('/login');
		}
	}, [user]);

	return user ? (
		<>
			<Outlet />
		</>
	) : null;
}

export default RootLayout;
