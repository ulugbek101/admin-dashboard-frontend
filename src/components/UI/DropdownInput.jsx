import inputStyles from "../../styles/Input.module.css";

function DropdownInput({ value, setValue, name, required, label }) {

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
                <option value="teacher" selected>Ustoz</option>
                <option value="admin">Administrator</option>
			</select>
            {/* <div className="min-h-[59px] w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0">

            </div> */}
			<label htmlFor={name} className="text-[#666] hover:cursor-text">
				{label}
			</label>
		</div>
	);
}

export default DropdownInput;
