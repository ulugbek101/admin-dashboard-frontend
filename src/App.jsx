import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import Analytics from './pages/Analytics.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Expenses from './pages/Expenses.jsx'
import Groups from './pages/Groups.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Pupils from './pages/Pupils.jsx'
import Settings from './pages/Settings.jsx'
import SubjectEdit, { loader as subjectLoader } from './pages/SubjectEdit.jsx'
import Subjects from './pages/Subjects.jsx'
import Teachers from './pages/Teachers.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Analytics /> },
			{
				path: 'subjects',
				element: <Subjects />,
			},
			{
				path: 'subjects/edit/:id',
				element: <SubjectEdit />,
				loader: subjectLoader,
			},
			{ path: 'groups', element: <Groups /> },
			{ path: 'teachers', element: <Teachers /> },
			{ path: 'pupils', element: <Pupils /> },
			{ path: 'expenses', element: <Expenses /> },
			{ path: 'settings', element: <Settings /> },
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
