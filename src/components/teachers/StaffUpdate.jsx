import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../context/auth-context";
import { baseURL } from "../../utils/urls";
import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";
import Input from "../UI/Input";
import ModalWindow from "../UI/ModalWindow";

function StaffUpdate({ fetchStaffList, onClose, updatingStaff }) {
	const { authTokens } = useContext(authContext);
	const [firstName, setFirstName] = useState(updatingStaff.firstName);
	const [lastName, setLastName] = useState(updatingStaff.lastName);
	const [email, setEmail] = useState(updatingStaff.email);
	const [status, setStatus] = useState(updatingStaff.status);
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [loading, setLoading] = useState(false);
	const [formIsValid, setFormIsValid] = useState(true);

	useEffect(() => {
		setFormIsValid(firstName.trim() && lastName.trim() && /^[^\s@]+@(?:email|gmail|bk)\.(?:ru|com)$/i.test(email.trim()) && status.trim());

		if (password1.trim() && password2.trim()) {
			setFormIsValid(
				firstName.trim() &&
					lastName.trim() &&
					/^[^\s@]+@(?:email|gmail|bk)\.(?:ru|com)$/i.test(email.trim()),
				status.trim() && password1 === password2
			);
		}
	}, [firstName, lastName, email, password1, password2]);

	const updateStaff = async () => {
		const formData = {
			first_name: firstName,
			last_name: lastName,
			email,
			status,
		};

		if (password1.trim() && password2.trim() && password1 === password2) {
			formData.password = password2;
		}

		setLoading(true);
		try {
			await axios.patch(
				`${baseURL}/users/${updatingStaff.id}/`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authTokens?.access}`,
					},
				}
			);
			fetchStaffList();
			onClose();
			toast.success("Xodim ma'lumotlari yangilandi");
		} catch (error) {
			toast.error("Xodim ma'lumotlarini yangilashda xatolik yuz berdi");
		}
		setLoading(false);
	};

	return (
		<ModalWindow onClose={onClose}>
			<div className="flex justify-end">
				<CloseButton onClose={onClose} />
			</div>
			<hr className="my-2" />
			<div className="flex flex-col bg-white min-w-[450px]">
				<div>
					<h5 className="text-xl text-center">
						Xodim ma'lumotlarini o'zgartirish
					</h5>
					<form className="flex flex-col gap-4 mt-5">
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
							type="email"
							name="email"
						/>
						<Input
							label="Xodim statusi"
							value={status}
							setValue={setStatus}
							type="text"
							name="status"
						/>
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
						<Button disabled={loading || !formIsValid} onClick={updateStaff}>
							O'qituvchi ma'lumotlarini yangilash
						</Button>
					</form>
				</div>
			</div>
		</ModalWindow>
	);
}

export default StaffUpdate;
