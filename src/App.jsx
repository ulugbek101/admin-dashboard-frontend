import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RootLayout from './layouts/RootLayout';
import SubjectsPage from "./pages/SubjectsPage"

function App() {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route path='/' element={<ProfilePage />} exact />
				<Route path='/subjects' element={<SubjectsPage />} />
			</Route>
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	);
}

export default App;
