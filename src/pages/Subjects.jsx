import { useContext, useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import SubjectAdd from '../components/SubjectAdd'
import SubjectDelete from '../components/SubjectDelete'
import { authContext } from '../context/AuthContext'
import axiosInstance from '../hooks/useAxios'
import styles from '../styles/RootLayout.module.css'

function Subjects() {
	const { user } = useContext(authContext)
	const [modalIsActive, setModalIsActive] = useState(false)
	const [deleteModalIsActive, setDeleteModalIsActive] = useState(false)
	const [subjects, setSubjects] = useState([])
	const [deletingSubject, setDeletingSubject] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const response = await axiosInstance.get('subjects/')

			setSubjects(response.data)
		} catch (error) {
			if (error.response.status === 401) {
				navigate('/login')
			}
		}
	}

	const addSubjectHandler = () => {
		setModalIsActive(true)
	}

	return (
		<>
			<h1 className={styles.title}>Barcha fanlar</h1>
			<div className={styles['card-wrapper']}>
				<div className={styles.card}>
					{user?.status === 'Superadmin' && (
						<button
							onClick={addSubjectHandler}
							className='max-w-max p-4 border border-white rounded-[0.4rem] flex items-center justify-center'
						>
							Fan qo&apos;shish
						</button>
					)}
					<table className='min-w-full text-left'>
						<thead>
							<tr>
								<th className='whitespace-nowrap px-6 py-2 text-center'>№</th>
								<th className='whitespace-nowrap px-6 py-2 text-center'>Fan</th>
								<th className='whitespace-nowrap px-6 py-2 text-center'>
									Guruhlar soni
								</th>
								<th className='whitespace-nowrap px-6 py-2 text-center'>
									O&apos;quvchilar soni
								</th>
								{user?.status === 'Superadmin' && (
									<th className='whitespace-nowrap px-6 py-2 text-center'>
										O&apos;zgartirish/O&apos;chirish
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{/* TODO loader */}
							{subjects &&
								subjects.map((subject, index) => (
									<tr
										key={subject.id}
										className='border-b dark:border-neutral-500 hover:bg-neutral-600 transition'
									>
										<td className='whitespace-nowrap px-6 py-1 text-center'>
											{index + 1}
										</td>
										<td className='whitespace-nowrap px-6 py-1 text-center'>
											{subject.name}
										</td>
										<td className='whitespace-nowrap px-6 py-1 text-center'>
											{subject.groups_count}
										</td>
										<td className='whitespace-nowrap px-6 py-1 text-center'>
											{subject.pupils_count}
										</td>
										{user.status === 'Superadmin' && (
											<td className='whitespace-nowrap px-6 py-1 flex flex-row item-center justify-center gap-2'>
												<Link
													to={`edit/${subject.id}`}
													className='p-2 rounded hover:bg-yellow-600 transition transition-transform transform active:scale-90 inline-block'
												>
													<MdEdit fontSize={20} />
												</Link>

												<button
													disabled={subject.groups_count}
													onClick={() => {
														setDeletingSubject(subject)
														setDeleteModalIsActive(true)
													}}
													className={`p-2 max-w-max rounded ${
														!subject.groups_count && 'hover:bg-red-600'
													} ${
														subject.groups_count && 'bg-gray-500'
													} transition transition-transform transform active:scale-90 inline-block`}
												>
													<MdDelete fontSize={20} />
												</button>
											</td>
										)}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>

			<SubjectAdd
				modalIsActive={modalIsActive}
				setModalIsActive={setModalIsActive}
				fetchSubjects={fetchSubjects}
			/>
			<SubjectDelete
				modalIsActive={deleteModalIsActive}
				setModalIsActive={setDeleteModalIsActive}
				fetchSubjects={fetchSubjects}
				deletingSubject={deletingSubject}
				setDeletingSubject={setDeletingSubject}
			/>
		</>
	)
}

export default Subjects
