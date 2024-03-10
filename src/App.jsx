import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function App() {
	return (
		<Routes>
			<Route element={<HomePage />} path='/' />
			<Route element={<LoginPage />} path='/login' />
		</Routes>
	)
}

export default App
