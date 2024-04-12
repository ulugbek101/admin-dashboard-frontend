import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RootLayout from './layouts/RootLayout';

function App() {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route path='/' element={<ProfilePage />} exact />
			</Route>
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	);
}

export default App;
