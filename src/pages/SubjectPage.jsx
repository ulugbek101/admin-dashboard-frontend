import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubjectObject from "../components/subjects/SubjectObject";
import SubjectUpdate from "../components/subjects/SubjectUpdate";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import { authContext } from "../context/auth-context";
import { baseURL } from "../utils/urls";

function SubjectPage() {
	const { user, authTokens } = useContext(authContext);
	const navigate = useNavigate();
	const [subject, setSubject] = useState("");
	const [subjectList, setSubjectList] = useState([]);
	const [deletingSubject, setDeletingSubject] = useState(null);
	const [updatingSubject, setUpdatingSubject] = useState(null);
	const [deleteSubjectModalIsOpen, setDeleteSubjectModalIsOpen] =
		useState(false);
	const [createSubjectModalIsOpen, setCreateSubjectModalIsOpen] =
		useState(false);
	const [updateSubjectModalIsOpen, setUpdateSubjectModalIsOpen] =
		useState(false);

	useEffect(() => {
		if (!["admin", "superuser"].includes(user.status)) navigate("/");

		const closeMoreButton = document.addEventListener("keydown", () => {
			const moreButtons = Array.from(
				document.getElementsByClassName("moreButton")
			);
			moreButtons.forEach(element => {
				element.classList.add("hidden");
				element.classList.remove("flex");
			});
		});

		fetchSubjectList();

		return document.removeEventListener("keydown", closeMoreButton);
	}, []);

	const fetchSubjectList = async () => {
		try {
			const response = await axios.get(`${baseURL}/subjects/`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`,
				},
			});
			setSubjectList(response.data);
		} catch (error) {
			toast.error("Fanlar ro'yxatini olib bo'lmadi");
		}
	};

	return ["admin", "superuser"].includes(user.status) ? (
		<div className="grid grid-cols-12 gap-8">
			<div className="flex items-center justify-between col-span-12 row-span-2">
				<h4 className="text-[2rem] font-bold">Barcha fanlar</h4>
				<div className="flex items-center gap-2">
					<div className="relative">
						<Input
							className="pt-[18px] px-[18px] pb-[4px] pr-12"
							label="Fan qidirish"
							name="staff_search"
							type="text"
							value={subject}
							setValue={setSubject}
						/>
						<span
							onClick={() => {
								setSubject("");
							}}
							className={`${
								!subject && "hidden "
							} material-icons text-[#666] absolute top-1/2 right-[10px] -translate-y-1/2 cursor-pointer`}
						>
							close
						</span>
					</div>
					<Button
						className="active:scale-95"
						// onClick={setCreateStaffModalIsOpen.bind(null, true)}
						disabled={false}
					>
						Fan qo'shish
					</Button>
				</div>
			</div>
			<Card className="col-span-12 shadow-xl bg-white max-h-[65vh] overflow-auto">
				<table className="w-full">
					<thead>
						<tr className="grid grid-cols-12 py-3 border-b-[1px] border-[#e0e0e0] mb-5">
							<th className="col-span-2 text-start px-2">#</th>
							<th className="col-span-4 text-start px-2">Fan nomi</th>
							<th className="col-span-2 text-start px-2">Qo'shilgan sana</th>
							<th className="col-span-2 text-start px-2">
								O'zgartirilgan sana
							</th>
							<th className="col-span-2"></th>
						</tr>
					</thead>
					<tbody className="flex flex-col gap-2">
						{subjectList &&
							subjectList
								.filter(subjectItem =>
									subjectItem.name
										.toLowerCase()
										.includes(subject.toLocaleLowerCase().trim())
								)
								.map((subject, index) => (
									<SubjectObject
										key={index}
										index={index}
										subject={subject}
										// setDeletingSubject={setDeletingSubject}
										setUpdatingSubject={setUpdatingSubject}
										// setDeleteSubjectModalIsOpen={setDeleteSubjectModalIsOpen}
										setUpdateSubjectModalIsOpen={setUpdateSubjectModalIsOpen}
									/>
								))}
					</tbody>
				</table>
			</Card>
			{updateSubjectModalIsOpen && (
				<SubjectUpdate
					fetchSubjectList={fetchSubjectList}
					updatingSubject={updatingSubject}
					onClose={setUpdateSubjectModalIsOpen.bind(null, false)}
				/>
			)}
		</div>
	) : null;
}

export default SubjectPage;
