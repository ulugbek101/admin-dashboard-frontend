import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

function Analytics() {
	const { user } = useContext(authContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (user?.status === 'Xodim') {
			navigate('/groups')
		}
	}, [user])

	return (
		<div>
			<h1>Analytics</h1>
		</div>
	)
}

export default Analytics
