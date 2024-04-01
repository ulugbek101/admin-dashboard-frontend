import { useContext } from "react";
import { authContext } from "../context/auth-context";

const Top: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
	const { user } = useContext(authContext);

	return (
		<div className="p-4 flex items-center justify-between bg-[var(--color-white)]">
			<span className="material-icons-sharp" onClick={onOpen}>
				menu
			</span>
			<img
				className="rounded-full w-[2.5rem]"
				src={user.profileImage}
				alt="Logo"
			/>
		</div>
	);
};

export default Top;
