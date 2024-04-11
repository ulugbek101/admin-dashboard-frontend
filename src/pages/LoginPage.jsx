import inputStyles from '../styles/Input.module.css';

function LoginPage() {
	return (
		<form className='absolute flex flex-col w-full gap-2 px-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
			<h3 className='mb-3 text-2xl text-center'>Tizimga kirish</h3>
			<div className={inputStyles.inputGroup}>
				<input
					type='text'
					name='email'
					id='email'
					placeholder=''
					className='w-full border border-black rounded'
				/>
				<label htmlFor='email'>E-mail</label>
			</div>
			<div className={inputStyles.inputGroup}>
				<input
					type='password'
					name='password'
					id='password'
					placeholder=''
					className='w-full border border-black rounded'
				/>
				<label htmlFor='password'>Parol</label>
			</div>
			<button type='button' className='py-2 border border-black rounded'>
				Kirish
			</button>
		</form>
	);
}

export default LoginPage;
