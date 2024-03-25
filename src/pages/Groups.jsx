import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAxios from '../hooks/useAxios'
import styles from '../styles/Button.module.css'

const Groups = () => {
	const [groups, setGroups] = useState([])
	const axiosInstance = useAxios()

	useEffect(() => {
		fetchGroups()
	}, [])

	const fetchGroups = async () => {
		try {
			const response = await axiosInstance.get('groups/')
			setGroups(response.data)
		} catch (error) {
			toast.warning('Guruhlarni yuklashda hatolik yuz berdi')
			console.log(error)
		}
	}

	return (
		<>
			<h1>Guruglar</h1>
			<div className='card-wrapper'>
				<div className='card'>
					<Link className={`${styles.button} flex items-center gap-2`} to='add'>
						<span className='material-icons-sharp'> group_add </span>
						Guruh qo'shish
					</Link>
					<table>
						<thead>
							<tr>
								<th>№</th>
								<th>Guruh</th>
								<th>O'qituvchi</th>
								<th>Fan</th>
								<th>Narxi</th>
								<th>Bolalar</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{groups.map((group, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{group.name}</td>
									<td>{group.teacher}</td>
									<td>{group.subject}</td>
									<td>{group.price}</td>
									<td>{group.pupils}</td>
									<td>
										<button className='py-1 px-2 mx-1 transition hover:bg-[orange] rounded'>
											<span className='material-icons-sharp'>edit</span>
										</button>
										<button className='py-1 px-2 mx-1 transition hover:bg-[orange] rounded'>
											<span className='material-icons-sharp'>delete</span>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Groups
