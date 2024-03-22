import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { authContext } from '../context/auth-context'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { loginUser, user } = useContext(authContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	const handleSubmit = e => {
		e.preventDefault()
		loginUser(email, password)
	}

	return (
		<div className='container'>
			<div className='signin-form'>
				<form onSubmit={handleSubmit} className='form' id='login-form'>
					<h1>Tizimga kirish</h1>
					<div id='input-wrapper'>
						<input
							type='email'
							name='email'
							onChange={e => setEmail(e.target.value)}
							value={email}
							id='email'
							placeholder=''
						/>
						<label htmlFor='email'>E-mail manzil</label>
					</div>
					<div id='input-wrapper'>
						<input
							type='password'
							name='password'
							onChange={e => setPassword(e.target.value)}
							value={password}
							id='password'
							placeholder=''
						/>
						<label htmlFor='password'>Parol</label>
					</div>
					<button disabled={!email || !password} type='submit'>
						Kirish
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
