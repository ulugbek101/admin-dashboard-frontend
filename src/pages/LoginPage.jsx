import { useContext } from 'react'
import { authContext } from '../context/auth/AuthContext'
import styles from '../styles/LoginPage.module.css'

const LoginPage = () => {
	const { loginUser } = useContext(authContext)

	return (
		<form className={styles.form}>
			<h1 className={styles.title}>Tizimga kirish</h1>
			<br />
			<div className='input-wrapper'>
				<input
					type='email'
					placeholder=''
					name='email'
					id='email'
					autoFocus
					required
				/>
				<label htmlFor='email'>E-mail manzil</label>
			</div>
			<div className='input-wrapper'>
				<input
					type='password'
					placeholder=''
					name='password'
					id='password'
					required
				/>
				<label htmlFor='password'>Parol</label>
			</div>
			<br />
			<button>Kirish</button>
		</form>
	)
}

export default LoginPage
