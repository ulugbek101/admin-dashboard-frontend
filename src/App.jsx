import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import TeachersPage from "./pages/TeachersPage";

function App() {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route path="/" element={<ProfilePage />} exact />
				<Route path="/teachers" element={<TeachersPage />} />
			</Route>
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
