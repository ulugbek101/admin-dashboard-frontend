import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/auth-context";
import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";
import Input from "../UI/Input";
import ModalWindow from "../UI/ModalWindow";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../../utils/urls";

function SubjectUpdate({ fetchSubjectList, onClose, updatingSubject }) {
	const { authTokens } = useContext(authContext);
	const [name, setName] = useState(updatingSubject.name);
	const [loading, setLoading] = useState(false);
	const [formIsValid, setFormIsValid] = useState(true);

	useEffect(() => {
		setFormIsValid(name.trim().length >= 3);
	}, [name]);

	const updateSubject = async () => {
		const formData = {
			name: name,
		};

		setLoading(true);
		try {
			await axios.patch(`${baseURL}/subjects/${updatingSubject.id}/`, formData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authTokens?.access}`,
				},
			});
			fetchSubjectList();
			onClose();
			toast.success("Fan ma'lumotlari yangilandi");
		} catch (error) {
            console.log(error)
			toast.error("Fan ma'lumotlarini yangilashda xatolik yuz berdi");
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
						Fan ma'lumotlarini o'zgartirish
					</h5>
					<form className="flex flex-col gap-4 mt-5">
						<Input
							label="Fan nomi"
							value={name}
							setValue={setName}
							type="text"
							name="name"
						/>
						<Button disabled={loading || !formIsValid} onClick={updateSubject}>
							Fan ma'lumotlarini yangilash
						</Button>
					</form>
				</div>
			</div>
		</ModalWindow>
	);
}

export default SubjectUpdate;
