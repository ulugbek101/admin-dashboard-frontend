import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import StaffCreate from "../components/teachers/StaffCreate";
import StaffDelete from "../components/teachers/StaffDelete";
import StaffObject from "../components/teachers/StaffObject";
import StaffUpdate from "../components/teachers/StaffUpdate";
import { authContext } from "../context/auth-context";
import { baseURL } from "../utils/urls";

function StaffPage() {
	const { authTokens, user } = useContext(authContext);
	const navigate = useNavigate();
	const [staffList, setStaffList] = useState([]);
	const [deletingStaff, setDeletingStaff] = useState(null);
	const [updatingStaff, setUpdatingStaff] = useState(null);
	const [deleteStaffModalIsOpen, setDeleteStaffModalIsOpen] = useState(false);
	const [createStaffModalIsOpen, setCreateStaffModalIsOpen] = useState(false);
	const [updateStaffModalIsOpen, setUpdateStaffModalIsOpen] = useState(false);

	useEffect(() => {
		if (!["admin", "superuser"].includes(user.status)) navigate("/");

		fetchStaffList();
	}, []);

	const fetchStaffList = async () => {
		try {
			const response = await axios.get(`${baseURL}/users/`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`,
				},
			});
			setStaffList(response.data);
		} catch (error) {
			toast.error("Ustozlar ro'yxatini olib bo'lmadi");
		}
	};

	return ["admin", "superuser"].includes(user.status) ? (
		<div className="grid grid-cols-12 gap-8">
			<div className="flex items-center justify-between col-span-12 row-span-2">
				<h4 className="text-[2rem] font-bold">Barcha xodimlar</h4>
				<Button
					onClick={setCreateStaffModalIsOpen.bind(null, true)}
					disabled={false}
				>
					Xodim qo'shish
				</Button>
			</div>
			<Card className="col-span-12 shadow-xl bg-white max-h-[65vh] overflow-auto">
				<table className="w-full">
					<thead>
						<tr className="grid grid-cols-12 py-3 border-b-[1px] border-[#e0e0e0] mb-5">
							<th className="col-span-1 text-start px-2">#</th>
							<th className="col-span-3 text-start px-2">F.I.Sh</th>
							<th className="col-span-3 text-start px-2">E-mail</th>
							<th className="col-span-2 text-start px-2">Xodim statusi</th>
							<th className="col-span-2 text-start px-2">Qo'shilgan sana</th>
							<th className="col-span-1"></th>
						</tr>
					</thead>
					<tbody className="flex flex-col gap-2">
						{staffList &&
							staffList.map((staff, index) => (
								<StaffObject
									key={index}
									index={index}
									staff={staff}
									setDeletingStaff={setDeletingStaff}
									setUpdatingStaff={setUpdatingStaff}
									setDeleteStaffModalIsOpen={setDeleteStaffModalIsOpen}
									setUpdateStaffModalIsOpen={setUpdateStaffModalIsOpen}
								/>
							))}
					</tbody>
				</table>
			</Card>
			{deleteStaffModalIsOpen && (
				<StaffDelete
					fetchStaffList={fetchStaffList}
					deletingStaff={deletingStaff}
					onClose={setDeleteStaffModalIsOpen.bind(null, false)}
				/>
			)}
			{createStaffModalIsOpen && (
				<StaffCreate
					fetchStaffList={fetchStaffList}
					onClose={setCreateStaffModalIsOpen.bind(null, false)}
				/>
			)}
			{updateStaffModalIsOpen && (
				<StaffUpdate
					fetchStaffList={fetchStaffList}
					updatingStaff={updatingStaff}
					onClose={setUpdateStaffModalIsOpen.bind(null, false)}
				/>
			)}
		</div>
	) : null;
}

export default StaffPage;