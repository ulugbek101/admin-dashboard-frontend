import { useContext, useState } from 'react';
import { authContext } from '../context/auth-context';
import inputStyles from '../styles/Input.module.css';

function LoginPage() {
	const { loginUser, isLoading } = useContext(authContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmitHandler = e => {
		e.preventDefault();
		loginUser(email, password)
	};

	return (
		<form
			onSubmit={onSubmitHandler}
			className='absolute flex flex-col w-full gap-2 px-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'
		>
			<h3 className='mb-3 text-2xl text-center'>Tizimga kirish</h3>
			<div className={inputStyles.inputGroup}>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='text'
					name='email'
					id='email'
					placeholder=''
					className='w-full border border-black rounded'
					required
				/>
				<label htmlFor='email'>E-mail</label>
			</div>
			<div className={inputStyles.inputGroup}>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					name='password'
					id='password'
					placeholder=''
					className='w-full border border-black rounded'
					required
				/>
				<label htmlFor='password'>Parol</label>
			</div>
			<button disabled={isLoading} type='submit' className='flex items-center justify-center py-2 border border-black rounded disabled:border-slate-500 disabled:text-slate-500'>
				{isLoading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="grey" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>}
				Kirish
			</button>
		</form>
	);
}

export default LoginPage;
