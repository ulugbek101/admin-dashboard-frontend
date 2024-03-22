import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authContext } from '../context/auth-context'
import useAxios from '../hooks/use-axios'

const SubjectAdd = () => {
	const axiosInstance = useAxios()
	const [error, setError] = useState('')
	const [subject, setSubject] = useState('')
	const [buttonIsDisabled, setButtonIsDisabled] = useState(false)
	const { logoutUser } = useContext(authContext)
	const navigate = useNavigate()

	const onSubmitHandler = async e => {
		e.preventDefault()

		if (subject.trim().length <= 1) {
			setError("Fan nomi 3 ta belgidan kam bo'lishi mumkin emas")
			return
		}
		setButtonIsDisabled(true)
		try {
			const subjectName =
				subject[0].toUpperCase() + subject.slice(1).toLowerCase()
			const response = await axiosInstance.post('api/v1/subjects/', {
				name: subjectName,
			})
			setError('')
			toast.success("Fan muvaqqayotali qo'shildi")
			navigate('/subjects')
		} catch (error) {
			if (error.response?.status === 400) {
				setError('Bunday nomga ega fan allaqachon mavjud')
				toast.error('Bunday nomga ega fan allaqachon mavjud')
			} else if (error.response?.status === 401) {
				toast.warning('Sessiya vaqti tugadi, iltimos tizimga qaytadan kiring')
				logoutUser()
			}
		}
		setButtonIsDisabled(false)
	}

	return (
		<>
			<h1>Fan qo'shish</h1>
			<div className='card-wrapper'>
				<form onSubmit={onSubmitHandler} className='form'>
					<div>
						<label htmlFor='name'>Fan nomi:</label>
						<input
							value={subject}
							onChange={e => {
								setSubject(e.target.value)
								setError('')
							}}
							type='text'
							name='name'
							id='name'
							placeholder=''
						/>
					</div>
					{error && <p className='danger'>{error}</p>}
					<br />
					<button disabled={buttonIsDisabled}>Fanni qo'shish</button>
				</form>
			</div>
		</>
	)
}

export default SubjectAdd
