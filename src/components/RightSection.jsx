import { MdAddChart, MdDarkMode, MdDownload, MdLightMode } from 'react-icons/md'

import styles from '../styles/RightSection.module.css'

const RightSection = () => {
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
						<p>
							Salom, <b className={styles['profile-name']}>Ulug'bek</b>
						</p>
						<small className='text-muted'>O'qituvchi</small>
					</div>
					<div className={styles['profile-photo']}>
						<img
							src='https://res.cloudinary.com/dhtrn05k4/image/upload/v1/thedevu101-admin-media/profile-pictures/ULUGBEK_UMARALIEV_wpzhqc'
							alt="Ulug'bek Umaraliyev"
							title="Ulug'bek Umaraliyev"
						/>
					</div>
				</div>
			</div>

			<div className={styles['user-profile']}>
				<div className={styles.logo}>
					<img
						src='https://res.cloudinary.com/dhtrn05k4/image/upload/v1/thedevu101-admin-media/profile-pictures/ULUGBEK_UMARALIEV_wpzhqc'
						alt="Ulug'bek Umaraliyev"
						title="Ulug'bek Umaraliyev"
					/>
					<h2 className={styles['user-profile-title']}>Ulug'bek Umaraliyev</h2>
					<p>O'qituvchi</p>
				</div>
			</div>

			<div className={styles.reminders}>
				<div className={styles.header}>
					<h2 className={styles['user-profile-title']}>Statistikani yuklab olish</h2>
					<MdAddChart fontSize={30} />
				</div>

				<div className={styles.notification}>
					<form action='/download-stats/' method='post'>
						<input
							type='hidden'
							name='csrfmiddlewaretoken'
							value='QURJXXbakr2aHXgSl3Mr5iCz4sLOcwPF3R76ExQXRsy3TPGDLwt0nFRNNI3l4yZz'
						/>
						<select name='month' className={styles.select}>
							<option value='current' className={styles.option}>
								Shu oy uchun
							</option>
							<option value='previous' className={styles.option}>
								O'tgan oy uchun
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
		</div>
	)
}

export default RightSection
