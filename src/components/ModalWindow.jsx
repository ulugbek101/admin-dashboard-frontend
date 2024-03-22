import ReactDOM from 'react-dom'
import styles from '../styles/ModalWindow.module.css'

const ModalWindow = ({ children, isOpen, onClose }) => {
	if (!isOpen) return

	return ReactDOM.createPortal(
		<>
			<div className={styles.modalOverlay} onClick={onClose}></div>
			<div className={styles.modal}>
				<div className='flex items-center justify-end'>
					<span
						className='material-icons-sharp hover:cursor-pointer'
						onClick={onClose}
					>
						close
					</span>
				</div>
				<div className='modal-body'>{children}</div>
			</div>
		</>,
		document.getElementById('modal')
	)
}

export default ModalWindow
