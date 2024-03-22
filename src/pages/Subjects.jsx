import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ModalWindow from '../components/ModalWindow'
import { authContext } from '../context/auth-context'
import useAxios from '../hooks/use-axios'
import styles from '../styles/Button.module.css'

const Subjects = () => {
	const axiosInstance = useAxios()
	const { logoutUser } = useContext(authContext)
	const [subjects, setSubjects] = useState([])
	const [editingSubject, setEditingSubject] = useState({})
	const [isOpen, setIsOpen] = useState(false)

	const handleSubjectChange = async () => {
		try {
			const response = await axiosInstance.put(
				`api/v1/subjects/${editingSubject.id}/`,
				{
					name: editingSubject.name,
				}
			)
			toast.success("Fan nomi muvaffaqiyatli o'zgartirildi")
			setEditingSubject({})
			setIsOpen(false)
		} catch (error) {
			if (error?.response.status === 400) {
				toast.error('Bundan nomli allaqachon mavjud')
			}

			if (error?.response.status === 401) {
				toast.warning('Tizimga qayta kiring, sessiya vaqti tugagan')
				logoutUser()
			}
		}
	}

	const handleModalClose = () => {
		setEditingSubject(null)
		setIsOpen(false)
	}

	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const response = await axiosInstance.get('/api/v1/subjects/')
			setSubjects(response.data)
		} catch (error) {
			if (error?.response.status === 401) {
				toast.warning('Tizimga qayta kiring, sessiya vaqti tugagan')
				logoutUser()
			} else {
				toast.warning("Noma'lum xatolik yuz berdi")
				console.log(error)
			}
		}
	}

	return (
		<>
			<h1>Barcha fanlar</h1>
			<div className='card-wrapper'>
				<div className='card'>
					<Link className={`${styles.button} flex items-center gap-1`} to='add'>
						<span className='material-icons-sharp'> bookmark_add </span>
						Fan qo'shish
					</Link>
					<table>
						<thead>
							<tr>
								<th>№</th>
								<th>Fan</th>
								<th>Guruhlar</th>
								<th>O'quvchilar</th>
								<th>O'zgartirish</th>
							</tr>
						</thead>
						<tbody>
							{subjects.map((subject, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{subject.name}</td>
									<td>{subject.groups_count}</td>
									<td>{subject.pupils_count}</td>
									<td>
										<button
											onClick={() => {
												setIsOpen(true)
												setEditingSubject({
													id: subject.id,
													name: subject.name,
												})
											}}
											className='py-1 px-2 mx-1 transition hover:bg-[orange] rounded'
										>
											<span className='material-icons-sharp'>edit</span>
										</button>
										<button className='py-1 px-2 mx-1 transition hover:bg-[red] rounded'>
											<span className='material-icons-sharp'>delete</span>
										</button>
									</td>
								</tr>
							))}
							{isOpen && (
								<ModalWindow isOpen={isOpen} onClose={handleModalClose}>
									<div>
										<label htmlFor='subjectName'>Fan nomi:</label>
										<input
											onChange={e =>
												setEditingSubject({
													id: editingSubject.id,
													name: e.target.value,
												})
											}
											type='text'
											name='subjectName'
											id='subjectName'
											value={editingSubject.name}
										/>
										<button
											className={`${styles.button} w-full border-white`}
											onClick={handleSubjectChange}
										>
											O'zgartirish
										</button>
									</div>
								</ModalWindow>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Subjects
