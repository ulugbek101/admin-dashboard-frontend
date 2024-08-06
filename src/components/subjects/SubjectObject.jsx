import { useContext, useRef, useState } from "react";
import { authContext } from "../../context/auth-context";
import { stringifyDate } from "../../utils/date";

function SubjectObject({
	setDeleteSubjectModalIsOpen,
	setUpdateSubjectModalIsOpen,
	setUpdatingSubject,
	setDeletingSubject,
	subject,
	index,
}) {
	const { user } = useContext(authContext);
	const [moreButtonIsClicked, setMoreButtonIsClicked] = useState(false);
	const moreButtonRef = useRef();

	function handleMoreButtonClick(e) {
		setMoreButtonIsClicked(!moreButtonIsClicked);

		if (moreButtonIsClicked) return;

		let moreButtons = Array.from(document.getElementsByClassName("moreButton"));
		moreButtons = moreButtons.filter(
			element => element != e.target.parentElement.querySelector(".moreButton")
		);

		e.target.parentElement.querySelector(".moreButton").classList.add("flex");
		e.target.parentElement
			.querySelector(".moreButton")
			.classList.remove("hidden");

		moreButtons.forEach(element => element.classList.add("hidden"));
		moreButtons.forEach(element => element.classList.remove("flex"));
	}

	return (
		<tr className="grid grid-cols-12 py-3 hover:cursor-pointer hover:bg-[#f5f5f5] transition rounded-lg">
			<th className="col-span-2 flex justify-start items-center w-full px-2">
				{index + 1}
			</th>
			<td className="col-span-4 flex justify-start items-center w-full px-2">
				{subject.name}
			</td>
			<td className="col-span-2 flex justify-start items-center w-full px-2">
				{stringifyDate(subject.created)}
			</td>
			<td className="col-span-2 flex justify-start items-center w-full px-2">
				{stringifyDate(subject.updated)}
			</td>

			<td className="col-span-2 flex justify-end w-full px-2">
				<div className="relative">
					<span
						onClick={handleMoreButtonClick}
						className="material-icons p-2 hover:bg-[#e0e0e0] active:scale-90 rounded transition select-none"
					>
						more_vert
					</span>
					<div
						ref={moreButtonRef}
						className={`${
							moreButtonIsClicked ? "flex" : "hidden"
						} moreButton absolute flex-col gap-1 top-[100%] right-0 rounded p-2 bg-white z-10 shadow-lg`}
					>
						<button
							onClick={() => {
								setUpdateSubjectModalIsOpen(true);
								setUpdatingSubject({
									id: subject.id,
									name: subject.name,
								});
							}}
							className="rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-yellow-600 select-none"
						>
							<span className="material-icons text-sm">edit</span>
							O'zgartirish
						</button>
						<button
							// onClick={() => {
							// 	setDeleteSubjectModalIsOpen(true);
							// 	setDeletingSubject({
							// 		id: subject.id,
							// 		name: subject.name,
							// 	});
							// }}
							className="disabled:text-[#e0e0e0] disabled:scale-100 disabled:hover:bg-white disabled:cursor-not-allowed rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-red-600 select-none"
						>
							<span className="material-icons text-sm">delete</span>
							O'chirish
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default SubjectObject;
