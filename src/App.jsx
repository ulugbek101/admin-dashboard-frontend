import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Analytics from './pages/Analytics'
import Expenses from './pages/Expenses'
import Groups from './pages/Groups'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Pupils from './pages/Pupils'
import Subjects from './pages/Subjects'
import Teachers from './pages/Teachers'

function App() {
	return (
		<>
			<Routes>
				<Route element={<RootLayout />} path='/'>
					<Route element={<Subjects />} path='subjects' />
					<Route element={<Groups />} path='groups' />
					<Route element={<Teachers />} path='teachers' />
					<Route element={<Pupils />} path='pupils' />
					<Route element={<Analytics />} path='analytics' />
					<Route element={<Expenses />} path='expenses' />
					<Route element={<Profile />} path='profile' />
				</Route>
				<Route element={<Login />} path='/login' />
			</Routes>
		</>
	)
}

export default App
