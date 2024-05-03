import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../context/auth-context";
import { baseURL } from "../../utils/urls";
import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";
import ModalWindow from "../UI/ModalWindow";

function StaffDelete({ onClose, deletingStaff, fetchStaffList }) {
	const { authTokens } = useContext(authContext);
	const [loading, setLoading] = useState(false);

	const deleteStaff = async id => {
		setLoading(true);
		try {
			await axios.delete(`${baseURL}/users/${id}/`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authTokens?.access}`,
				},
			});

			toast.success("Ustoz ma'lumotlari muvaffaqiyatli o'chirildi");
			fetchStaffList();
		} catch (error) {
			toast.error("Ustozni ma'lumotlarini o'chirishda xatolik yuz berdi");
			console.log(error);
		}
		setLoading(false);
		onClose()
	};

	return (
		<ModalWindow onClose={onClose}>
			<div className="flex justify-end">
				<CloseButton onClose={onClose} />
			</div>
			<hr className="my-2" />
			<div className="flex flex-col bg-white min-w-[450px]">
				<div>
					<h5 className="text-xl">
						F.I.Sh: {deletingStaff.firstName} {deletingStaff.lastName}
					</h5>
					<p>Xodimni o'chirishga ishonchingiz komilmi ?</p>
					<div className="flex items-center justify-end mt-5 gap-1">
						<Button
							disabled={loading}
							onClick={deleteStaff.bind(null, deletingStaff.id)}
							className="w-1/2 bg-red-600"
						>
							Ha, 100%
						</Button>
						<Button onClick={onClose} disabled={loading} className="w-1/2">
							Bekor qilish
						</Button>
					</div>
				</div>
			</div>
		</ModalWindow>
	);
}

export default StaffDelete;
