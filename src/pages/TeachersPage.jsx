import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/UI/Button";
import TeacherCreate from "../components/teachers/TeacherCreate";
import TeacherDelete from "../components/teachers/TeacherDelete";
import TeachersList from "../components/teachers/TeachersList";
import { authContext } from "../context/auth-context";
import { baseURL } from "../utils/urls";

function TeachersPage() {
	const { authTokens } = useContext(authContext);
	const [teachers, setTeachers] = useState([]);
	const [deletingTeacher, setDeletingTeacher] = useState(null);
	const [deleteTeacherModalIsOpen, setDeleteTeacherModalIsOpen] =
		useState(false);
	const [createTeacherModalIsOpen, setCreateTeacherModalIsOpen] =
		useState(false);

	useEffect(() => {
		fetchTeachers();
	}, []);

	const fetchTeachers = async () => {
		try {
			const response = await axios.get(`${baseURL}/teachers`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`,
				},
			});
			setTeachers(response.data);
			setDeletingTeacher(null);
			setDeleteTeacherModalIsOpen(false);
		} catch (error) {
			toast.error("Ustozlar ro'yxatini olib bo'lmadi");
		}
	};

	return (
		<div className="grid grid-cols-12 gap-8">
			<div className="flex items-center justify-between col-span-12 row-span-2">
				<h4 className="text-[2rem] font-bold">Barcha ustozlar</h4>
				<Button
					onClick={setCreateTeacherModalIsOpen.bind(null, true)}
					disabled={false}
				>
					Ustoz qo&apos;shish
				</Button>
			</div>
			<div className="col-span-12 shadow-xl bg-white rounded-xl p-5">
				<table className="w-full">
					<thead>
						<tr className="grid grid-cols-12 py-3 border-b-[1px] border-[#e0e0e0] mb-5">
							<th className="col-span-1 text-start px-2">#</th>
							<th className="col-span-4 text-start px-2">F.I.Sh</th>
							<th className="col-span-3 text-start px-2">E-mail</th>
							<th className="col-span-2 text-start px-2">
								Qo&apos;shilgan sana
							</th>
							<th className="col-span-2"></th>
						</tr>
					</thead>
					<tbody className="flex flex-col gap-2">
						{teachers && (
							<TeachersList
								setDeletingTeacher={setDeletingTeacher}
								setModalIsOpen={setDeleteTeacherModalIsOpen}
								teachers={teachers}
							/>
						)}
					</tbody>
				</table>
			</div>
			{deleteTeacherModalIsOpen && (
				<TeacherDelete
					onClose={setDeleteTeacherModalIsOpen.bind(null, false)}
					fetchTeachers={fetchTeachers}
					deletingTeacher={deletingTeacher}
				/>
			)}
			{createTeacherModalIsOpen && (
				<TeacherCreate
					onClose={setCreateTeacherModalIsOpen.bind(null, false)}
				/>
			)}
		</div>
	);
}

export default TeachersPage;
