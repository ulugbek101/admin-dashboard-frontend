import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAxios from '../hooks/useAxios'

const GroupAdd = () => {
	const [error, setError] = useState('')
	const [buttonIsDisabled, setButtonIsDisabled] = useState(false)
	const [group, setGroup] = useState('')
	const [price, setPrice] = useState('')
	const [teacher, setTeacher] = useState('')
	const [subject, setSubject] = useState('')
	const [subjects, setSubjects] = useState([])
	const [teachers, setTeachers] = useState([])
	const navigate = useNavigate()
	const axiosInstance = useAxios()

	const fetchSubjects = async () => {
		try {
			const response = await axiosInstance.get('subjects/')
			setSubjects(response.data)
		} catch (error) {
			toast.warning('Fanlarni yuklashda xatolik yuz berdi')
			console.log(error)
		}
	}

	const fetchTeachers = async () => {
		try {
			const response = await axiosInstance.get('profiles/teachers/')
			setTeachers(response.data)
		} catch (error) {
			toast.warning("O'qituvchilarni yuklashda xatolik yuz berdi")
			console.log(error)
		}
	}

	useEffect(() => {
		fetchSubjects()
		fetchTeachers()
	}, [])

	const onSubmitHandler = async e => {
		e.preventDefault()

		if (group.trim().length <= 1) {
			setError("Fan nomi 3 ta belgidan kam bo'lishi mumkin emas")
			return
		}
		setButtonIsDisabled(true)
		try {
			const groupName = group[0].toUpperCase() + group.slice(1).toLowerCase()
			await axiosInstance.post('groups/', {
				name: groupName,
				subject: subject,
				teacher: teacher,
				price: price,
			})
			setError('')
			toast.success("Guruh muvaffaqiyatli qo'shildi")
			navigate('/groups')
		} catch (error) {
			if (error.response?.status === 400) {
				setError('Bunday nomga ega guruh allaqachon mavjud')
				toast.warning('Bunday nomga ega guruh allaqachon mavjud')
			} else {
				toast.warning("Noma'lum xatolik yuz berdi")
				console.log(error)
			}
		}
		setButtonIsDisabled(false)
	}

	return (
		<>
			<h1>Guruh qo'shish</h1>
			<div className='card-wrapper'>
				<form onSubmit={onSubmitHandler} className='form'>
					<div>
						<label htmlFor='name'>Guruh nomi:</label>
						<input
							value={group}
							onChange={e => setGroup(e.target.value)}
							autoFocus
							type='text'
							name='name'
							id='name'
							placeholder=''
						/>
					</div>
					<div>
						<label htmlFor='price'>Narxi:</label>
						<input
							value={price}
							onChange={e => setPrice(e.target.value)}
							type='text'
							name='price'
							id='price'
							placeholder=''
						/>
					</div>
					<div>
						<label htmlFor='subject'>Fan:</label>
						<select
							name='subject'
							id='subject'
							onChange={e => setSubject(e.target.value)}
							value={subject}
						>
							<option value=''>---------</option>
							{subjects.map((subject, index) => (
								<option value={subject.id} key={index}>
									{subject.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor='teacher'>O'qituvchisi:</label>
						<select
							name='teacher'
							id='teacher'
							onChange={e => setTeacher(e.target.value)}
							value={teacher}
						>
							<option value=''>---------</option>
							{teachers.map((teacher, index) => (
								<option value={teacher.id} key={index}>
									{teacher.last_name} {teacher.first_name}
								</option>
							))}
						</select>
					</div>
					{error && <p className='danger'>{error}</p>}
					<br />
					<button disabled={buttonIsDisabled}>Qo'shish</button>
				</form>
			</div>
		</>
	)
}

export default GroupAdd
