import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth-context";
import { defaultUserImage } from "../utils/urls";

function Navbar() {
	const { user, logoutUser } = useContext(authContext);
	const [profileDrowdownIsShown, setProfileDrowdownIsShown] = useState(false);

	return (
		<nav>
			<div className="flex row justify-between min-h-[96px] py-[28px] items-center max-w-[1168px] m-auto">
				<Link to="/">
					<span className="text-black text-3xl font-sans">MyAdmin</span>
				</Link>
				<div className="relative">
					<img
						onClick={() => setProfileDrowdownIsShown(!profileDrowdownIsShown)}
						src={user.profile_image ? user.profile_image : defaultUserImage}
						alt={user.full_name}
						className="w-10 rounded-full hover:cursor-pointer"
					/>
					{profileDrowdownIsShown && (
						<div className="transition absolute p-5 top-[calc(100% + 8px)] right-0 rounded-2xl shadow">
							<ul>
								<li>1</li>
								<li>2</li>
								<li onClick={logoutUser}>Logout</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
