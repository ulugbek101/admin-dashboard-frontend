import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../context/auth-context";
import { baseURL } from "../../utils/urls";
import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";
import ModalWindow from "../UI/ModalWindow";

function TeacherCreate({ onClose }) {
	const { authTokens } = useContext(authContext);
	const [loading, setLoading] = useState(false);

	const createTeacher = async () => {
		setLoading(true);
		try {
			await axios.post(
				`${baseURL}/teachers/`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authTokens?.access}`,
					},
				}
			);
		} catch (error) {
			toast.error("Ustoz qo'shishda xatolik ketdi");
		}
		setLoading(false);
	};

	return (
		<ModalWindow>
			<div className="flex justify-end">
				<CloseButton onClose={onClose} />
			</div>
			<hr className="my-2" />
			<div className="flex flex-col bg-white min-w-[450px]">
				<div>
					<h5 className="text-xl text-center">
						Yangi ustoz ma&apos;lumotlarini kiriting
					</h5>
					...
					<div className="flex items-center justify-end mt-5 gap-1">
						<Button
							type="submit"
							onClick={createTeacher}
							disabled={loading}
							className="w-full"
						>
							Ustozni qo&apos;shish
						</Button>
					</div>
				</div>
			</div>
		</ModalWindow>
	);
}

export default TeacherCreate;
