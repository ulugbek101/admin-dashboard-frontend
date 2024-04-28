import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { authContext } from "../context/auth-context";

function RootLayout() {
	const { user } = useContext(authContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			toast.error("Tizimga kirish talab etiladi");
			navigate("/login");
		}
	}, [user]);

	return user ? (
		<>
			<Navbar />
			<main className="max-w-[1168px] m-auto pt-5">
				<Outlet />
			</main>
		</>
	) : null;
}

export default RootLayout;
