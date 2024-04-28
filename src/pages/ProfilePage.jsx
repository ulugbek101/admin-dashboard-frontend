import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth-context";
import inputStyles from "../styles/Input.module.css";

function ProfilePage() {
	const { user, updateUser } = useContext(authContext);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [formIsValid, setFormIsValid] = useState(true);
	// const [profileImageUrl, setProfileImageUrl] = useState(
	// 	user.profile_image ? user.profile_image : defaultUserImage
	// );
	// const [userImage, setUserImage] = useState(null);
	// const [userImageSize, setUserImageSize] = useState(null);

	// const handleFileChange = event => {
	// 	const file = event.target.files[0];
	// 	setUserImage(file);
	// 	if (file) {
	// 		setUserImageSize(file.size);
	// 		const reader = new FileReader();
	// 		reader.onload = () => {
	// 			setProfileImageUrl(reader.result);
	// 		};
	// 		reader.readAsDataURL(file);
	// 	} else {
	// 		setUserImageSize(null);
	// 		setProfileImageUrl(null);
	// 	}
	// };

	const validateUserForm = () => {
		setFormIsValid(firstName.trim() && lastName.trim() && email.trim());
	};

	const updateUserInformation = e => {
		e.preventDefault();
		if (!formIsValid) return;
		updateUser(firstName, lastName, email);
	};

	return (
		<>
			<Link to=".." className="flex items-center gap-2 my-10 group w-max">
				<div className="bg-[#ebebeb] h-[40px] w-[40px] rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
					<span className="material-icons ms-[6px] text-sm">
						arrow_back_ios
					</span>
				</div>
				Orqaga
			</Link>
			<div className="mb-[16px] p-10 bg-[#f5f5f5] rounded-3xl flex flex-row items-center gap-[28px]">
				<label
					htmlFor="profile_image"
					className="relative group hover:cursor-pointer"
				>
					<img
						src="https://avatars.githubusercontent.com/u/94630185?v=4"
						alt={`${user.first_name} ${user.last_name}`}
						className="w-[100px] rounded-full"
					/>
					<div className="hidden absolute group-hover:flex transition items-center justify-center w-full h-full rounded-full bg-[#00000046] top-0 left-0">
						<span className="material-icons text-white">photo_camera</span>
					</div>
				</label>
				<div className="text-[32px] flex flex-col gap-[16px]">
					<div>
						<span className="font-bold">{user.first_name} </span>
						<span className="font-bold">{user.last_name}</span>
					</div>
					<span className="text-[18px] text-[#666]">{user.email}</span>
				</div>
			</div>

			<div className="p-10 bg-[#f5f5f5] rounded-3xl flex flex-row justify-between items-start gap-[50px] mb-[16px]">
				<div className="flex items-center gap-[16px]">
					<div className="rounded-full w-[40px] h-[40px] bg-[#3d3bff] flex items-center justify-center">
						<span className="material-icons text-white text-[18px]">
							person
						</span>
					</div>
					<span className="text-[24px]">Shaxsiy ma'lumotlarim</span>
				</div>
				<div>
					<form
						className="flex flex-col h-[100%] gap-4 justify-between min-w-[500px]"
						onSubmit={updateUserInformation}
					>
						<div className={inputStyles.inputGroup}>
							<input
								value={firstName}
								onChange={e => {
									setFirstName(e.target.value);
									validateUserForm();
								}}
								type="text"
								name="first_name"
								id="first_name"
								placeholder=""
								className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
								required
							/>
							<label
								htmlFor="first_name"
								className="text-[#666] hover:cursor-text"
							>
								Ism
							</label>
						</div>
						<div className={inputStyles.inputGroup}>
							<input
								value={lastName}
								onChange={e => {
									setLastName(e.target.value);
									validateUserForm();
								}}
								type="text"
								name="last_name"
								id="last_name"
								placeholder=""
								className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
								required
							/>
							<label
								htmlFor="last_name"
								className="text-[#666] hover:cursor-text"
							>
								Familiya
							</label>
						</div>
						<div className={inputStyles.inputGroup}>
							<input
								value={email}
								onChange={e => {
									setEmail(e.target.value);
									validateUserForm();
								}}
								type="email"
								name="email"
								id="email"
								placeholder=""
								className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
								required
							/>
							<label htmlFor="email" className="text-[#666] hover:cursor-text">
								E-mail manzil
							</label>
						</div>
						{/* <input
							className="opacity-0"
							type="file"
							name="profile_image"
							id="profile_image"
							onChange={handleFileChange}
							value={userImage}
						/> */}

						<button
							disabled={!formIsValid}
							className="flex disabled:bg-[#b8b8b8] disabled:text-white items-center text-white bg-[#3d3bff] justify-center py-[12px] px-[48px] transition border border-[#e0e0e0] focus:border-[#b8b8b8] focus:outline-0 rounded-[12px] text-[18px] hover:text-white hover:bg-[#000] w-max"
							type="submit"
						>
							Saqlash
						</button>
					</form>
				</div>
			</div>

			<div className="p-10 bg-[#f5f5f5] rounded-3xl flex flex-row justify-between items-start gap-[50px] mb-24">
				<div className="flex items-center gap-[16px]">
					<div className="rounded-full w-[40px] h-[40px] bg-[#666] flex items-center justify-center">
						<span className="material-icons text-white text-[18px]">lock</span>
					</div>
					<span className="text-[24px]">Parol</span>
				</div>
				<div>
					<form
						action=""
						className="flex flex-col h-[100%] gap-4 justify-between min-w-[500px]"
					>
						<div className={inputStyles.inputGroup}>
							<input
								value={password1}
								onChange={e => setPassword1(e.target.value)}
								type="password"
								name="password1"
								id="password1"
								placeholder=""
								className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
								required
							/>
							<label
								htmlFor="password1"
								className="text-[#666] hover:cursor-text"
							>
								Parol
							</label>
						</div>
						<div className={inputStyles.inputGroup}>
							<input
								value={password2}
								onChange={e => setPassword2(e.target.value)}
								type="password"
								name="password2"
								id="password2"
								placeholder=""
								className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
								required
							/>
							<label
								htmlFor="password2"
								className="text-[#666] hover:cursor-text"
							>
								Parolni tasdiqlang
							</label>
						</div>
						<button
							disabled
							className="flex disabled:cursor-not-allowed disabled:bg-[#b8b8b8] disabled:text-white items-center text-white bg-[#3d3bff] justify-center py-[12px] px-[48px] transition border border-[#e0e0e0] focus:border-[#b8b8b8] focus:outline-0 rounded-[12px] text-[18px] hover:text-white hover:bg-[#000] w-max"
							type="submit"
						>
							Saqlash
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default ProfilePage;
