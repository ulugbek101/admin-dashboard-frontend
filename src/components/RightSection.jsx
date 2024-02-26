import { MdAddChart, MdDarkMode, MdDownload, MdLightMode } from 'react-icons/md'

import { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import styles from '../styles/RightSection.module.css'
import { baseResourceURL } from '../utils/authUtils'

const RightSection = () => {
	const { user } = useContext(authContext)

	return (
		<div className={styles['right-section']}>
			<div className={styles.nav}>
				<button id='menu-btn' className={styles['menu-btn']}>
					<span className='material-icons-sharp'>menu</span>
				</button>
				<div className={styles['dark-mode']}>
					<MdLightMode />
					<MdDarkMode />
				</div>

				<div className={styles.profile}>
					<div className={styles.info}>
						<p className='flex flex-row gap-1'>
							Salom,{' '}
							<b className={styles['profile-name']}>{user?.first_name}</b>
						</p>
					</div>
					<div className={styles['profile-photo']}>
						<img
							src={`${baseResourceURL}${user?.profile_image}`}
							alt={`${user?.first_name} ${user?.last_name}`}
							title={`${user?.first_name} ${user?.last_name}`}
						/>
					</div>
				</div>
			</div>

			<div className={styles['user-profile']}>
				<div className={styles.logo}>
					<img
						src={`${baseResourceURL}${user?.profile_image}`}
						alt="Ulug'bek Umaraliyev"
						title="Ulug'bek Umaraliyev"
					/>
					<h2
						className={styles['user-profile-title']}
					>{`${user?.first_name} ${user?.last_name}`}</h2>
					<p>{user?.status}</p>
				</div>
			</div>

			{user?.status === 'Superadmin' && (
				<div className={styles.reminders}>
					<div className={styles.header}>
						<h2 className={styles['user-profile-title']}>
							Statistikani yuklash
						</h2>
						<MdAddChart fontSize={30} />
					</div>

					<div className={styles.notification}>
						<form method='get'>
							<select name='month' className={styles.select}>
								<option value='current' className={styles.option}>
									Shu oy uchun
								</option>
								<option value='previous' className={styles.option}>
									O&apos;tgan oy uchun
								</option>
							</select>
							<br />
							<button type='button' className={styles.button}>
								<MdDownload fontSize={24} className='animate-bounce' />
								Yuklab olish
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default RightSection
