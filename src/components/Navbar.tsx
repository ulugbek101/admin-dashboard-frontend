import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/auth-context";

const Navbar: React.FC<{ isClosed: boolean; onClose: () => void }> = ({
	isClosed,
	onClose,
}) => {
	const { logoutUser } = useContext(authContext);

	return (
		<aside
			className={`z-20 transition-transform duration-500 bg-[var(--color-white)] p-4 flex flex-col h-screen absolute w-screen left-0 ${
				isClosed ? "-translate-x-full" : "translate-x-0"
			}`}
		>
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2 font-bold">
					<img
						className="rounded-full w-[2.5rem]"
						src="https://shams-school.uz/static/custom-images/favicon.png"
						alt="Logo"
					/>
					<h2 className="text-2xl">
						SHAMS<span className="text-red-600">XM</span>
					</h2>
				</div>
				<span className="material-icons-sharp" onClick={() => onClose()}>
					close
				</span>
			</div>

			<div className="pt-5 flex flex-col gap-5 h-full">
				<NavLink
					to="/subjects"
					className="flex items-center gap-2 py-2"
					onClick={() => onClose()}
				>
					<span className="material-icons-sharp">people</span>
					Fanlar
				</NavLink>
				<a href="" className="flex items-center gap-2 py-2">
					<span className="material-icons-sharp">people_alt</span>
					O'qituvchilar
				</a>
				<a href="" className="flex items-center gap-2 py-2">
					<span className="material-icons-sharp">school</span>
					O'qituvchilar
				</a>
				<a href="" className="flex items-center gap-2 py-2">
					<span className="material-icons-sharp">people</span>
					O'qituvchilar
				</a>
				<NavLink
					to="/"
					className="flex items-center gap-2 py-2"
					onClick={() => onClose()}
				>
					<span className="material-icons-sharp">people_alt</span>
					Profil
				</NavLink>
				<a
					href=""
					onClick={e => {
						e.preventDefault();
						logoutUser();
					}}
					className="flex items-center gap-2 mt-auto"
				>
					<span className="material-icons-sharp">logout</span>
					Chiqish
				</a>
			</div>
		</aside>
	);
};

export default Navbar;
