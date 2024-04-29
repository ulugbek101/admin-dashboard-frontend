import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth-context";
import { defaultUserImage } from "../utils/urls";

function Navbar() {
	const { user, logoutUser } = useContext(authContext);
	const [profileDrowdownIsShown, setProfileDrowdownIsShown] = useState(false);
	const dropdownMenuRef = useRef();

	useEffect(() => {
		let closeDropdownMenu = e => {
			if (!dropdownMenuRef.current.contains(e.target)) {
				setProfileDrowdownIsShown(false);
			}
		};
		document.addEventListener("mousedown", closeDropdownMenu);

		return () => document.removeEventListener("mousedown", closeDropdownMenu);
	});

	return (
		<nav>
			<div className="flex row justify-between min-h-[96px] py-[28px] items-center max-w-[1168px] m-auto">
				<Link to="/">
					<img src="/logo.jpeg" alt="" className="max-w-40" />
				</Link>
				<div className="relative">
					<img
						onClick={() => setProfileDrowdownIsShown(!profileDrowdownIsShown)}
						src={user.profile_image ? user.profile_image : defaultUserImage}
						alt={user.full_name}
						className="w-10 rounded-full hover:cursor-pointer"
					/>
					{profileDrowdownIsShown && (
						<div
							ref={dropdownMenuRef}
							className="transition absolute p-5 top-[48px] w-[280px] right-0 rounded-2xl shadow-lg bg-white"
						>
							<div className="flex flex-row justify-between gap-3 mx-3 mb-2 pb-2 items-center border-b-[1px] border-[#e0e0e0]">
								<img
									className="w-[40px] h-[40px] rounded-full"
									src={user.profile_image}
									alt={user.full_name}
								/>
								<div className="flex flex-col overflow-hidden whitespace-nowrap">
									<strong className="overflow-hidden text-ellipsis text-[16px]">
										{user.full_name}
									</strong>
									<span className="text-[#666] overflow-hidden text-ellipsis text-[14px]">
										{user.email}
									</span>
								</div>
							</div>
							<ul>
								<li className="p-[6px] pe-[16px] rounded-xl transition hover:cursor-pointer min-h-[44px] flex items-center hover:bg-[#f5f5f5]">
									<div className="ms-[10px] w-full">
										<Link className="w-full block" to="/">
											Profil
										</Link>
									</div>
								</li>
								<li className="p-[6px] pe-[16px] rounded-xl transition hover:cursor-pointer min-h-[44px] flex items-center hover:bg-[#f5f5f5]">
									<div className="ms-[10px] w-full">
										<Link className="w-full block">Chiqimlar</Link>
									</div>
								</li>
								<li className="p-[6px] pe-[16px] rounded-xl transition hover:cursor-pointer min-h-[44px] flex items-center hover:bg-[#f5f5f5]">
									<div className="ms-[10px] w-full">
										<Link className="w-full block">To'lovlar</Link>
									</div>
								</li>
								<li className="p-[6px] pe-[16px] rounded-xl transition hover:cursor-pointer min-h-[44px] flex items-center hover:bg-[#f5f5f5]">
									<div className="ms-[10px] w-full">
										<Link className="w-full block">Analitika</Link>
									</div>
								</li>
								<li className="p-[6px] pe-[16px] rounded-xl transition hover:cursor-pointer min-h-[44px] flex items-center hover:bg-[#f5f5f5]">
									<div className="ms-[10px] w-full" onClick={logoutUser}>
										Chiqish
									</div>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
