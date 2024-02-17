import { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthContext.jsx'
import useAxios from '../hooks/useAxios.jsx'

function HomePage(props) {
	const [teachersList, setTeachersList] = useState([])
	const { logoutUser, authTokens } = useContext(authContext)
	const axiosInstance = useAxios()

	async function getTeachersList() {
		const response = await axiosInstance.get('profiles/teachers/')
		// const response = await fetch(`${BASE_URL}/profiles/teachers/`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Authorization': 'Bearer ' + authTokens.access
		// 	}
		// })

		if (response.status === 200) {
			setTeachersList(response.data)
		}
	}

	useEffect(() => {
		getTeachersList()
	}, [])

	return (
		<>
			<h1>Home Page</h1>
		</>
	)
}

export default HomePage
