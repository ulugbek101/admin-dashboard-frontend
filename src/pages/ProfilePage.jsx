import { useContext, useState } from 'react';
import { authContext } from '../context/auth-context';
import inputStyles from '../styles/Input.module.css';
import { defaultUserImage } from '../utils/urls';

function ProfilePage() {
	const { user } = useContext(authContext);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [status, setStatus] = useState(user.status);

	return (
		<form className='flex flex-col h-[100%] gap-4'>
			<div className={inputStyles.inputGroup}>
				<input
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					type='text'
					name='first_name'
					id='first_name'
					placeholder=''
					className='w-full font-bold border-2 border-gray-900 rounded focus:outline-0'
					required
				/>
				<label htmlFor='first_name' className='font-bold'>
					Ism
				</label>
			</div>
			<div className={inputStyles.inputGroup}>
				<input
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					type='text'
					name='last_name'
					id='last_name'
					placeholder=''
					className='w-full font-bold border-2 border-gray-900 rounded focus:outline-0'
					required
				/>
				<label htmlFor='last_name' className='font-bold'>
					Familiya
				</label>
			</div>
			<div className={inputStyles.inputGroup}>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type='email'
					name='email'
					id='email'
					placeholder=''
					className='w-full font-bold border-2 border-gray-900 rounded focus:outline-0'
					required
				/>
				<label htmlFor='email' className='font-bold'>
					E-mail manzil
				</label>
			</div>
			<div className={inputStyles.inputGroup}>
				<select
					name='status'
					id='status'
					className='w-full p-3 font-bold text-gray-900 border border-gray-900 rounded focus:outline-0'
				>
					<option
						className='font-bold'
						defaultValue={status === 'superuser'}
						value='superuser'
					>
						Boshqaruvchi menedjer (Superadmin)
					</option>
					<option
						className='font-bold'
						defaultValue={status === 'admin'}
						value='admin'
					>
						Boshqaruvchi administrator (admin)
					</option>
					<option
						className='font-bold'
						defaultValue={status === 'teacher'}
						value='teacher'
					>
						O'qituvchi
					</option>
				</select>
			</div>
			<div className='flex flex-row justify-between gap-4'>
				<div className='relative'>
					<input
						// value={status}
						// onChange={e => setStatus(e.target.value)}
						type='file'
						accept='image/png, image/jpg, image/jpeg'
						name='profile_image'
						id='profile_image'
						placeholder=''
						className='w-1/2 h-full p-2 font-bold border-2 border-gray-900 rounded opacity-0 focus:outline-0'
						required
					/>
					<label
						for='profile_image'
						className='absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold border-2 border-gray-900 border-dashed rounded'
					>
						Profil rasm o'rnatish
					</label>
				</div>
				<img
					className='w-20'
					src={user.profile_image ? user.profile_image : defaultUserImage}
					alt=''
				/>
			</div>
			<small><b>*Profil rasmi 2 MB dan oshmasligi kerak</b></small>
			<button
				className='w-full px-2 py-2 font-bold transition bg-white border border-gray-900 rounded hover:text-white hover:bg-gray-900'
				type='submit'
			>
				Profil ma'lumotlarini yangialash
			</button>
		</form>
	);
}

export default ProfilePage;
