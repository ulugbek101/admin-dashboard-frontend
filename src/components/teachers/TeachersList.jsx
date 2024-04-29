import { useContext } from "react";
import { authContext } from "../../context/auth-context";
import { stringifyDate } from "../../utils/date";

function TeachersList({ teachers, setModalIsOpen, setDeletingTeacher }) {
	const { user } = useContext(authContext);

	return teachers.map((teacher, index) => (
		<tr
			key={teacher.id}
			className="grid grid-cols-12 py-3 hover:cursor-pointer hover:bg-[#f5f5f5] transition rounded-lg"
		>
			<th className="col-span-1 flex justify-start items-center w-full px-2">
				{index + 1}
			</th>
			<td className="col-span-4 flex justify-start items-center w-full px-2">
				{teacher.last_name} {teacher.first_name}
			</td>
			<td className="col-span-3 flex justify-start items-center w-full px-2">
				{teacher.email}
			</td>
			<td className="col-span-2 flex justify-start items-center w-full px-2">
				{stringifyDate(teacher.created)}
			</td>
			{(user.status === "teacher" || teacher.status === "superuser") &&
			user.id !== teacher.id ? null : (
				<td className="col-span-2 flex justify-end w-full px-2">
					<div className="relative group">
						<span className="material-icons p-2 hover:bg-[#e0e0e0] active:scale-90 rounded transition select-none">
							more_vert
						</span>
						<div className="absolute hidden group-hover:flex flex-col gap-1 top-[100%] right-0 rounded p-2 bg-white z-10 shadow-lg">
							<button className="rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-yellow-600 select-none">
								<span className="material-icons text-sm">edit</span>
								O&apos;zgartirish
							</button>
							<button
								disabled={teacher.id === user.id}
								onClick={() => {
									setModalIsOpen(true);
									setDeletingTeacher({
										id: teacher.id,
										first_name: teacher.first_name,
										last_name: teacher.last_name,
									});
								}}
								className="disabled:text-[#e0e0e0] disabled:scale-100 disabled:hover:bg-white disabled:cursor-not-allowed rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-red-600 select-none"
							>
								<span className="material-icons text-sm">delete</span>
								O&apos;chirish
							</button>
						</div>
					</div>
				</td>
			)}
		</tr>
	));
}

export default TeachersList;
