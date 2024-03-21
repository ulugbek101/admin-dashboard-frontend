import { useContext } from 'react'
import { toast } from 'react-toastify'
import { authContext } from '../context/auth-context'
import useAxios from '../hooks/use-axios'

const Teachers = () => {
	const { logoutUser } = useContext(authContext)
	const axiosInstance = useAxios()

	const fetchTeachers = async () => {
		try {
			const response = await axiosInstance.get('/api/v1/profiles/teachers/')
			console.log(response.data)
		} catch (error) {
			if (error?.response.status === 401) {
				toast.warning('Sessiya vaqti tugagan, qayta tizimga kiring')
				logoutUser()
			} else {
				toast.warning("Noma'lum xatolik yuz berdi")
				console.log(error)
			}
		}
	}

	return (
		<main>
			<p onClick={logoutUser}>Logout</p>
			<p onClick={fetchTeachers}>Fetch teachers</p>
			<h1>Home page</h1>
		</main>
	)
}

export default Teachers
