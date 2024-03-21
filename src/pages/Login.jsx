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
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				name='email'
				onChange={e => setEmail(e.target.value)}
				value={email}
			/>
			<input
				type='password'
				name='password'
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>
			<button disabled={!email || !password} type='submit'>
				Kirish
			</button>
		</form>
	)
}

export default Login
