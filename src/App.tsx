import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
	return (
		<Routes>
			<Route element={<RootLayout />} path="/">
				<Route element={<Profile />} index />
			</Route>
			<Route element={<Login />} path="/login" />
		</Routes>
	);
}

export default App;
