import ReactDOM from "react-dom";

function ModalWindow({ children }) {
	return ReactDOM.createPortal(
		<div className="z-20 w-full h-full absolute top-0 lef-0 bg-[#00000064] shadow-lg">
			<div className="z-30 rounded-2xl bg-white p-5 pt-3 absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]">
				{children}
			</div>
		</div>,
		document.getElementById("modal-window-overlay")
	);
}
export default ModalWindow;
