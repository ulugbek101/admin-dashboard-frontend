import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Analytics from './pages/Analytics'
import Expenses from './pages/Expenses'
import GroupAdd from './pages/GroupAdd'
import Groups from './pages/Groups'
import Login from './pages/Login'
import Payments from './pages/Payments'
import Profile from './pages/Profile'
import Pupils from './pages/Pupils'
import SubjectAdd from './pages/SubjectAdd'
import Subjects from './pages/Subjects'
import Teachers from './pages/Teachers'

function App() {
	return (
		<Routes>
			<Route element={<RootLayout />} path='/'>
				<Route path='subjects' element={<Subjects />} />
				<Route path='subjects/add' element={<SubjectAdd />} />
				<Route path='groups' element={<Groups />} />
				<Route path='groups/add' element={<GroupAdd />} />
				<Route path='teachers' element={<Teachers />} />
				<Route path='pupils' element={<Pupils />} />
				<Route path='analytics' element={<Analytics />} />
				<Route path='payments' element={<Payments />} />
				<Route path='expenses' element={<Expenses />} />
				<Route path='profile' element={<Profile />} />
			</Route>
			<Route element={<Login />} path='/login' />
		</Routes>
	)
}

export default App
