import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalWindow from "../components/ModalWindow";
import { authContext } from "../context/auth-context";
import { baseURL } from "../utils/urls";

function TeachersPage() {
	const { authTokens } = useContext(authContext);
	const [teachers, setTeachers] = useState([]);
	const [editingTeacher, setEditingTeacher] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);

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
		} catch (error) {
			toast.error("Ustozlar ro'yxatini olishda xatolik ketdi");
		}
	};

	// useEffect((() => {
	// 	if (editingTeacher) {
	// 		// ...
	// 	}
	// }, [modalIsOpen]))

	const stringifyDate = date => {
		const dateObject = new Date(date);
		return `${dateObject.getDate()}-${
			dateObject.getMonth() >= 10
				? dateObject.getMonth() + 1
				: "0" + (dateObject.getMonth() + 1)
		}-${dateObject.getFullYear()}`;
	};

	return (
		<div className="grid grid-cols-12 gap-8">
			<h4 className="text-[2rem] font-bold col-span-12 row-span-2">
				Barcha ustozlar
			</h4>
			<div className="col-span-12 shadow-xl bg-white rounded-xl p-5">
				<table className="w-full">
					<thead>
						<tr className="grid grid-cols-12 py-3 border-b-[1px] border-[#e0e0e0] mb-5">
							<th className="col-span-1 text-start px-2">#</th>
							<th className="col-span-4 text-start px-2">F.I.Sh</th>
							<th className="col-span-3 text-start px-2">E-mail</th>
							<th className="col-span-2 text-start px-2">Qo'shilgan sana</th>
							<th className="col-span-2"></th>
						</tr>
					</thead>
					<tbody className="flex flex-col gap-2">
						{teachers &&
							teachers.map((teacher, index) => (
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
									<td className="col-span-2 flex justify-end w-full px-2">
										<div className="relative group">
											<span className="material-icons p-2 hover:bg-[#e0e0e0] active:scale-90 rounded transition select-none">
												more_vert
											</span>
											<div className="absolute hidden group-hover:flex flex-col gap-1 top-[100%] right-0 rounded p-2 bg-white z-10 shadow-lg">
												<p
													onClick={() => {
														setModalIsOpen(true);
														setEditingTeacher({
															id: teacher.id,
															first_name: teacher.first_name,
															last_name: teacher.last_name,
														});
													}}
													className="rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-yellow-600 select-none"
												>
													<span className="material-icons text-sm">edit</span>
													O&apos;zgartirish
												</p>
												<p className="rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-red-600 select-none">
													<span className="material-icons text-sm">delete</span>
													O&apos;chirish
												</p>
											</div>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{modalIsOpen && (
				<ModalWindow>
						<div className="flex justify-end">
							<button onClick={() => setModalIsOpen(false)}>
								<span className="material-icons rounded p-1 hover:bg-[#f5f5f5] hover:cursor-pointer">
									close
								</span>
							</button>
						</div>
						<hr className="my-2" />
					<div className="flex flex-col bg-white min-w-[450px]">
						<div>
							<h5 className="text-xl">
								F.I.Sh: {editingTeacher.first_name} {editingTeacher.last_name}
							</h5>
							<p>Ustozni o&apos;chirishga ishonchingiz komilmi ?</p>
							<div className="flex items-center justify-end mt-5 gap-1">
								<button className="w-1/2 flex items-center text-white bg-red-600 justify-center py-[12px] px-[48px] transition border border-[#e0e0e0] focus:border-[#b8b8b8] focus:outline-0 rounded-[12px] text-[18px] hover:text-white hover:bg-[#000]">
									Ha, 100%
								</button>
								<button
									onClick={() => setModalIsOpen(false)}
									className="w-1/2 flex items-center text-white bg-[#3d3bff] justify-center py-[12px] px-[48px] transition border border-[#e0e0e0] focus:border-[#b8b8b8] focus:outline-0 rounded-[12px] text-[18px] hover:text-white hover:bg-[#000]"
								>
									Bekor qilish
								</button>
							</div>
						</div>
					</div>
				</ModalWindow>
			)}
		</div>
	);
}

export default TeachersPage;
