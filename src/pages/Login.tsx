import { FormEvent, useContext, useState } from "react";
import { authContext } from "../context/auth-context";
import styles from "../styles/Input.module.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { loginUser } = useContext(authContext);

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		loginUser(email, password);
	};

	return (
		<div className="p-5 absolute h-full w-full flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<form className="flex flex-col w-full gap-2" onSubmit={handleLogin}>
				<h3 className="text-center text-2xl mb-2">Tizimga kirish</h3>
				<div className={styles["input-group"]}>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="text"
						name="email"
						id="email"
						placeholder=""
						autoComplete="email"
					/>
					<label htmlFor="email">E-mail:</label>
				</div>
				<div className={styles["input-group"]}>
					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="text"
						name="password"
						id="password"
						placeholder=""
						autoComplete="new-password"
					/>
					<label htmlFor="password">Parol:</label>
				</div>
				<button
					className="border rounded-[var(--border-radius-1)] border-[var(--color-dark-variant)] p-[var(--padding-1-5)] mt-2"
					type="submit"
				>
					Kirish
				</button>
			</form>
		</div>
	);
};

export default Login;
