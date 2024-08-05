import inputStyles from "../../styles/Input.module.css";

function Input({
	value,
	setValue,
	name,
	type,
	required,
	label,
	className,
	onChange,
}) {
	return (
		<div className={inputStyles.inputGroup}>
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				type={type}
				name={name}
				id={name}
				placeholder=""
				className={`pt-[23px] px-[18px] pb-[10] w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0 ${className}`}
				required={required || true}
			/>
			<label htmlFor={name} className="text-[#666] hover:cursor-text">
				{label}
			</label>
		</div>
	);
}

export default Input;
