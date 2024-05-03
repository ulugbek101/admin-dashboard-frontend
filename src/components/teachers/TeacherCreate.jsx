import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../context/auth-context";
import { baseURL } from "../../utils/urls";
import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";
import Input from "../UI/Input";
import ModalWindow from "../UI/ModalWindow";

function TeacherCreate({ onClose, fetchTeachers }) {
	const { authTokens } = useContext(authContext);
	const [loading, setLoading] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	useEffect(() => {
		if (
			!firstName.trim() ||
			!lastName.trim() ||
			!email.trim() ||
			!password1 ||
			!password2 ||
			password1 !== password2
		) {
			setFormIsValid(false);
		} else {
			setFormIsValid(true);
		}
	}, [firstName, lastName, email, status, password1, password2]);

	const createTeacher = async () => {
		if (!formIsValid) {
			toast.warning("Forma ma'lumotlari noto'g'ri to'ldirilgan");
		}

		setLoading(true);
		try {
			await axios.post(
				`${baseURL}/teachers/`,
				{
					first_name: firstName,
					last_name: firstName,
					email: email,
					status: status,
					password: password2,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authTokens?.access}`,
					},
				}
			);
			toast.success("Ustoz ma'lumotlari muvaffaqiyatli qo'shildi");
			fetchTeachers();
			onClose()
		} catch (error) {
			if (error.response.status === 400) {
				toast.error("Bunday e-mail manzilga ega ustoz allaqachon mavjud");
			} else {
				toast.error("Ustoz qo'shishda xatolik ketdi");
			}
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
						Yangi ustoz malumotlarini kiriting
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
					</form>
					<div className="flex items-center justify-end mt-5 gap-1">
						<Button
							type="submit"
							onClick={createTeacher}
							disabled={loading || !formIsValid}
							className="w-full"
						>
							Ustozni qoshish
						</Button>
					</div>
				</div>
			</div>
		</ModalWindow>
	);
}

export default TeacherCreate;