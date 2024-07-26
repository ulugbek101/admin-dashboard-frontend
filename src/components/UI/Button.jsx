function Button({ children, onClick, disabled, className, type }) {
	return (
		<button
			type={type || "button"}
			className={`flex disabled:bg-[#b8b8b8] disabled:text-white items-center text-white bg-[#3d3bff] justify-center py-[12px] px-[48px] transition duration-200 border border-[#e0e0e0] focus:border-[#b8b8b8] focus:outline-0 rounded-[12px] text-[18px] hover:text-white hover:bg-[#000] ${className}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
