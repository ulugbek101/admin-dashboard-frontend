import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../context/auth-context";
import { stringifyDate } from "../../utils/date";
import { getStatus } from "../../utils/get-status";

function StaffObject({
	setDeleteStaffModalIsOpen,
	setUpdateStaffModalIsOpen,
	setUpdatingStaff,
	setDeletingStaff,
	staff,
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
		<tr
			className={`${
				user.id === staff.id && "bg-[#f5f5f5]"
			} grid grid-cols-12 py-3 hover:cursor-pointer hover:bg-[#f5f5f5] transition rounded-lg`}
		>
			<th className="col-span-1 flex justify-start items-center w-full px-2">
				{index + 1}
			</th>
			<td className="col-span-3 flex justify-start items-center w-full px-2">
				{staff.last_name} {staff.first_name}
			</td>
			<td className="col-span-3 flex justify-start items-center w-full px-2">
				{staff.email}
			</td>
			<td className="col-span-2 flex justify-start items-center w-full px-2">
				{getStatus(staff.status)}
			</td>
			<td className="col-span-2 flex justify-start items-center w-full px-2">
				{stringifyDate(staff.created)}
			</td>
			{staff.status === "superuser" && user.id !== staff.id ? null : (
				<>
					{user.status === "admin" && staff.status === "admin" ? null : (
						<td className="col-span-1 flex justify-end w-full px-2">
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
											setUpdateStaffModalIsOpen(true);
											setUpdatingStaff({
												id: staff.id,
												firstName: staff.first_name,
												lastName: staff.last_name,
												email: staff.email,
												status: staff.status,
											});
										}}
										className="rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-yellow-600 select-none"
									>
										<span className="material-icons text-sm">edit</span>
										O'zgartirish
									</button>
									<button
										disabled={staff.id === user.id}
										onClick={() => {
											setDeleteStaffModalIsOpen(true);
											setDeletingStaff({
												id: staff.id,
												firstName: staff.first_name,
												lastName: staff.last_name,
											});
										}}
										className="disabled:text-[#e0e0e0] disabled:scale-100 disabled:hover:bg-white disabled:cursor-not-allowed rounded flex gap-1 text-sm hover:bg-[#f5f5f5] p-2 active:scale-90 transition text-red-600 select-none"
									>
										<span className="material-icons text-sm">delete</span>
										O'chirish
									</button>
								</div>
							</div>
						</td>
					)}
				</>
			)}
		</tr>
	);
}

export default StaffObject;
