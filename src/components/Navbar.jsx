import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth-context";
import { defaultUserImage } from "../utils/urls";

function Navbar() {
	const { user } = useContext(authContext);

	return (
		<nav>
			<div className="flex row justify-between min-h-[96px] py-[28px] items-center container m-auto">
				<Link to="/">
					<span className="text-black text-3xl font-sans">MyAdmin</span>
				</Link>
				<img
					src={user.profile_image ? user.profile_image : defaultUserImage}
					alt={user.full_name}
					className="w-10 rounded-full hover:cursor-pointer"
				/>
			</div>
		</nav>
	);
}

export default Navbar;
