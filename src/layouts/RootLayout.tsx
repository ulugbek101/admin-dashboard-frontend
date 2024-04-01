import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Top from "../components/Top";
import { authContext } from "../context/auth-context";

const RootLayout = () => {
	const { user } = useContext(authContext);
	const navigate = useNavigate();
	const [isClosed, setIsClosed] = useState(true);

	const handleNavbar = () => {
		setIsClosed(!isClosed);
	};

	useEffect(() => {
		if (!user.id) {
			navigate("/login");
		}
	}, [user, navigate]);

	return (
		<>
			<Navbar isClosed={isClosed} onClose={handleNavbar} />
			<main className="h-full absolute w-full">
				<Top onOpen={handleNavbar} />
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
