import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/auth-context";
import inputStyles from "../styles/Input.module.css";

function LoginPage() {
	const { loginUser, isLoading } = useContext(authContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		validateForm();
	}, [email, password]);

	function validateForm() {
		const emailIsValid = /^[^\s@]+@(?:email|gmail|bk)\.(?:ru|com)$/i.test(
			email
		);
		const passwordIsValid = password.trim().length >= 1;
		setFormIsValid(emailIsValid && passwordIsValid);
	}

	const onSubmitHandler = e => {
		e.preventDefault();
		loginUser(email, password);
	};

	return (
		<div className="absolute h-full w-full bg-[#f5f5f5]">
			<form
				onSubmit={onSubmitHandler}
				className="absolute flex flex-col w-full gap-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 py-[48px] px-[20px] sm:p-[40px] rounded-[24px] bg-white sm:w-[380px]"
			>
				<h3 className="text-2xl text-gray-900 text-center mb-10">
					Tizimga kirish
				</h3>
				<div className={`${inputStyles.inputGroup} mb-4`}>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="text"
						name="email"
						id="email"
						placeholder=""
						autoComplete="off"
						className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
						required
					/>
					<label htmlFor="password" className="text-[#666]">
						E-mail
					</label>
				</div>
				<div className={`${inputStyles.inputGroup} mb-8`}>
					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
						name="password"
						id="password"
						placeholder=""
						autoComplete="off"
						className="w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0"
						required
					/>
					<label htmlFor="password" className="text-[#666]">
						Parol
					</label>
				</div>
				<button
					disabled={!formIsValid}
					type="submit"
					className="flex disabled:bg-[#b8b8b8] disabled:text-white items-center text-white bg-gray-900 justify-center py-[12px] px-[48px] transition border border-[#e0e0e0] focus:border-[#b8b8b8] focus:outline-0 rounded-[12px] text-[18px] hover:bg-gray-900 hover:text-white "
				>
					{isLoading && (
						<svg
							className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="black"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="white"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					)}
					Kirish
				</button>
			</form>
		</div>
	);
}

export default LoginPage;
