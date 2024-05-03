import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";

function ModalWindow({ children, onClose }) {
	const modalWindowOverLayRef = useRef(null);

	useEffect(() => {
		const closeModal = e => {
			if (e.target == modalWindowOverLayRef.current || e?.key === "Escape") {
				onClose();
			}
		};
		document.addEventListener("mousedown", closeModal);
		document.addEventListener("keydown", closeModal);
	});

	return ReactDOM.createPortal(
		<div
			className="z-20 w-full h-full absolute top-0 left-0 bg-[#00000064]"
			ref={modalWindowOverLayRef}
		>
			<Card className="z-30 bg-white p-5 pt-3 absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
				{children}
			</Card>
		</div>,
		document.getElementById("modal-window-overlay")
	);
}
export default ModalWindow;
