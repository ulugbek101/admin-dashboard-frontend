import { useContext, useEffect, useState } from "react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import { authContext } from "../context/auth-context";

function ProfilePage() {
	const { user, updateUser } = useContext(authContext);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [formIsValid, setFormIsValid] = useState(true);
	const [passwordsAreValid, setPasswordsAreValid] = useState(false);
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

	useEffect(() => {
		setFormIsValid(
			firstName.trim() &&
				lastName.trim() &&
				/^[^\s@]+@(?:email|gmail|bk)\.(?:ru|com)$/i.test(email)
		);
		setPasswordsAreValid(
			password1.trim() && password2.trim() && password1 === password2
		);
	}, [firstName, lastName, email, password1, password2]);

	const updateUserPassword = e => {
		e.preventDefault();
		if (!passwordsAreValid) return;
		updateUser(firstName, lastName, email, password2);
		setPassword1("");
		setPassword2("");
	};

	const updateUserInformation = e => {
		e.preventDefault();
		if (!formIsValid) return;
		updateUser(firstName, lastName, email);
	};

	return (
		<>
			<Card className="flex flex-row items-center gap-[28px] mb-[16px]">
				<label
					htmlFor="profile_image"
					className="relative group hover:cursor-pointer w-max"
				>
					<img
						src={user.profile_image}
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
			</Card>

			<Card className="flex flex-row justify-between items-start gap-[50px] mb-[16px]">
				<div className="flex items-center gap-[16px]">
					<div className="rounded-full w-[40px] h-[40px] bg-[#0387ff] flex items-center justify-center">
						<span className="material-icons text-white text-[18px]">
							person
						</span>
					</div>
					<span className="text-[24px]">Shaxsiy ma&apos;lumotlarim</span>
				</div>
				<div>
					<form
						className="flex flex-col h-[100%] gap-4 justify-between min-w-[500px]"
						onSubmit={updateUserInformation}
					>
						<Input
							label="Ism"
							value={firstName}
							setValue={setFirstName}
							type="text"
							name="first_name"
						/>
						<Input
							label="Familiya"
							value={lastName}
							setValue={setLastName}
							type="text"
							name="last_name"
						/>
						<Input
							label="E-mail manzil"
							value={email}
							setValue={setEmail}
							name="email"
							type="email"
						/>

						<Button disabled={!formIsValid} type="submit" className="w-max">
							Saqlash
						</Button>
					</form>
				</div>
			</Card>

			<Card className="flex flex-row justify-between items-start gap-[50px] mb-24">
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
						onSubmit={updateUserPassword}
					>
						<Input
							label="Parol"
							value={password1}
							setValue={setPassword1}
							type="password"
							name="password1"
						/>
						<Input
							label="Parolni tasdiqlang"
							value={password2}
							setValue={setPassword2}
							type="password"
							name="password2"
						/>
						<Button
							disabled={!passwordsAreValid}
							className="w-max"
							type="submit"
						>
							Saqlash
						</Button>
					</form>
				</div>
			</Card>
		</>
	);
}

export default ProfilePage;
