import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RootLayout from './layouts/RootLayout';

function App() {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route path='/' element={<HomePage />} exact />
			</Route>
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	);
}

export default App;
