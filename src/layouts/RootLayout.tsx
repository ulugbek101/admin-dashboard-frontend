import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Top from "../components/Top";
import { useState } from "react";

const RootLayout = () => {
	const [isClosed, setIsClosed] = useState(false);

	const handleNavbar = () => {
		setIsClosed(!isClosed);
	};

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
