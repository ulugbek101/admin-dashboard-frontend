import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
	{ path: '/', element: <RootLayout /> },
	{ path: '/login', element: <LoginPage /> },
])

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
