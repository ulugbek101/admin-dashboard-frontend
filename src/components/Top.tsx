const Top: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
	return (
		<div className="p-4 flex items-center justify-between bg-[var(--color-white)]">
			<span className="material-icons-sharp" onClick={onOpen}>
				menu
			</span>
			<img
				className="rounded-full w-[2.5rem]"
				src="https://shams-school.uz/static/custom-images/favicon.png"
				alt="Logo"
			/>
		</div>
	);
};

export default Top;
