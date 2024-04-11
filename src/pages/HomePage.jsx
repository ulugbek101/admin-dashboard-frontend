import { useContext } from 'react';
import { authContext } from '../context/auth-context';

function HomePage() {
	const { user, logoutUser } = useContext(authContext);

	console.log(user);
	return (
		<>
			<h1>
				Home page. {user && user.first_name} {user && user.email}
			</h1>
			<p onClick={logoutUser}>Logout</p>
		</>
	);
}

export default HomePage;
