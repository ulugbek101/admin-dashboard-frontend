import inputStyles from "../../styles/Input.module.css";

function DropdownInput({ value, setValue, name, required, label, options }) {
	return (
		<div className={inputStyles.inputGroup}>
			<select
				value={value}
				onChange={e => setValue(e.target.value)}
				type="text"
				name={name}
				id={name}
				placeholder=""
				className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
				required={required || true}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>{option.text}</option>
				))}
			</select>
			<label htmlFor={name} className="text-[#666] hover:cursor-text">
				{label}
			</label>
		</div>
	);
}

export default DropdownInput;
