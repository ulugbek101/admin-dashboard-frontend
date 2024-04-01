import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { authContext } from "../context/auth-context";
import useAxios from "../hooks/use-axios";
import { ResponseUser } from "../models/user";
import styles from "../styles/Input.module.css";

const Profile = () => {
	const { user, setUser } = useContext(authContext);
	const [errors, setErrors] = useState<{
		email: boolean;
		firstName: boolean;
		lastName: boolean;
		status: boolean;
	}>({ email: false, firstName: false, lastName: false, status: false });
	const axiosInstance = useAxios();

	const [firstName, setFirstName] = useState(() => user.firstName);
	const [lastName, setLastName] = useState(() => user.lastName);
	const [email, setEmail] = useState(() => user.email);
	const [status, setStatus] = useState(() => user.status);
	const [profileImage, setProfileImage] = useState<File | null>(null);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file: File | null = event.target.files ? event.target.files[0] : null;

		if (file) {
			setProfileImage(file);
		}
	};

	useEffect(() => {
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setStatus(user.status);
	}, [user]);

	const validateForm = () => {
		setErrors({
			email: email.trim() === "",
			firstName: firstName.trim() === "",
			lastName: lastName.trim() === "",
			status: status.trim() === "",
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		validateForm();

		if (
			email.trim() === "" ||
			firstName.trim() === "" ||
			lastName.trim() === "" ||
			status.trim() === ""
		)
			return;

		try {
			const response = await axiosInstance.patch(
				"/profiles/teachers/" + user.id + "/",
				{
					first_name: firstName,
					last_name: lastName,
					email: email,
					job: status,
				}
			);
			const newUser: ResponseUser = response.data;

			setUser({
				id: newUser.id,
				profileImage: newUser.profile_picture,
				isStaff: newUser.is_staff,
				isSuperuser: newUser.is_superuser,
				firstName: newUser.first_name,
				lastName: newUser.last_name,
				email: newUser.email,
				status: newUser.job,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl text-center">
				Profil ma'lumotlarini o'zgartirish
			</h1>
			<div className="flex justify-center p-4">
				<img
					className="rounded-full w-36"
					src={user.profileImage}
					alt="Shamsiddin Rahmonov"
				/>
			</div>
			<form onSubmit={handleSubmit} className="pt-4 flex flex-col gap-4">
				<div className={styles["input-group"]}>
					<input
						autoFocus
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
						type="text"
						name="firstName"
						id="firstName"
						placeholder=""
					/>
					<label htmlFor="firstName">Ism</label>
					{errors.firstName && (
						<small className="text-red-500">
							Ism bo'sh qolishi mumkin emas
						</small>
					)}
				</div>
				<div className={styles["input-group"]}>
					<input
						value={lastName}
						onChange={e => setLastName(e.target.value)}
						type="text"
						name="lastName"
						id="lastName"
						placeholder=""
					/>
					<label htmlFor="lastName">Famliya</label>
					{errors.lastName && (
						<small className="text-red-500">
							Familiya bo'sh qolishi mumkin emas
						</small>
					)}
				</div>
				<div className={styles["input-group"]}>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="email"
						name="email"
						id="email"
						placeholder=""
					/>
					<label htmlFor="email">E-mail manzil</label>
					{errors.email && (
						<small className="text-red-500">
							E-mail manzil bo'sh qolishi mumkin emas
						</small>
					)}
				</div>
				<div>
					<label htmlFor="profileImage">Profile rasmi:</label>
					<input
						className="appearance-none border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
						type="file"
						onChange={handleImageChange}
						accept="image/jpeg, image/jpg, image/png"
					/>
					{profileImage && (
						<small>
							Rasm hajmi: {(profileImage.size / 1000000).toFixed(1)} MB
						</small>
					)}
					<br />
					<small className="text-slate-300">
						Rasm hajmi 2 MB dan oshmasligi kerak
					</small>
				</div>
				<div className={styles["input-group"]}>
					<input
						value={status}
						onChange={e => setStatus(e.target.value)}
						type="text"
						name="status"
						id="status"
						placeholder=""
					/>
					<label htmlFor="email">Xodim statusi</label>
					{errors.status && (
						<small className="text-red-500">
							Xodim statusi bo'sh qolishi mumkin emas
						</small>
					)}
				</div>
				<button
					className="border border-[var(--color-dark-variant)] rounded p-4"
					type="submit"
				>
					Saqlash
				</button>
			</form>
		</div>
	);
};

export default Profile;
