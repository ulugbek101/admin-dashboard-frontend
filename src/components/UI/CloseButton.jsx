function CloseButton({ onClose }) {
	return (
		<button onClick={onClose}>
			<span className="material-icons rounded p-1 hover:bg-[#f5f5f5] hover:cursor-pointer">
				close
			</span>
		</button>
	);
}

export default CloseButton;
