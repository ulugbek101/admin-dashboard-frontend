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
	const [profileImageUrl, setProfileImageUrl] = useState(
		user.profile_image ? user.profile_image : defaultUserImage
	);
	const [userImage, setUserImage] = useState(null);
	const [userImageSize, setUserImageSize] = useState(null);

	const handleFileChange = event => {
		const file = event.target.files[0];
		setUserImage(file);
		if (file) {
			setUserImageSize(file.size);
			const reader = new FileReader();
			reader.onload = () => {
				setProfileImageUrl(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setUserImageSize(null);
			setProfileImageUrl(null);
		}
	};

	return (
		<form className='flex flex-col h-[100%] gap-4 justify-between'>
			<div className={inputStyles.inputGroup}>
				<input
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					type='text'
					name='first_name'
					id='first_name'
					placeholder=''
					className='w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0'
					required
				/>
				<label htmlFor='first_name'>
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
					className='w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0'
					required
				/>
				<label htmlFor='last_name'>
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
					className='w-full transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0'
					required
				/>
				<label htmlFor='email'>
					E-mail manzil
				</label>
			</div>
			<div className={inputStyles.inputGroup}>
				<select
					name='status'
					id='status'
					onChange={e => setStatus(e.target.value)}
					className='w-full p-[18px] pt-[23px] transition-colors duration-300 border rounded-[10px] border-[#e0e0e0] focus:border-[#b8b8b8] hover:border-[#b8b8b8] focus:outline-0'
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
						onChange={handleFileChange}
						type='file'
						accept='image/png, image/jpg, image/jpeg'
						name='profile_image'
						id='profile_image'
						placeholder=''
						className='w-1/2 h-full p-2 font-bold border-2 border-gray-900 rounded opacity-0 focus:outline-0'
						required
					/>
					<label
						htmlFor='profile_image'
						className='absolute top-0 left-0 flex items-center justify-center w-full h-full border border-gray-900 border-dashed rounded'
					>
						Profil rasm o'rnatish
					</label>
				</div>
				<img className='w-20' src={profileImageUrl} alt='' />
			</div>
			<small>
				{userImageSize && <small className="block">*Rasm hajmi: {(userImageSize / 1024 / 1024).toFixed(2)} MB</small>}
				<small>*Profil rasmi 2 MB dan oshmasligi kerak</small>
			</small>
			<button
				className='w-full mt-auto px-2 py-2 transition bg-white border border-gray-900 rounded hover:text-white hover:bg-gray-900'
				type='submit'
			>
				Profil ma'lumotlarini yangialash
			</button>
		</form>
	);
}

export default ProfilePage;
