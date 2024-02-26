import ReactDOM from 'react-dom'
import { IoMdClose } from 'react-icons/io'

function ModalComponent({ modalIsActive, setModalIsActive, children }) {
	if (!modalIsActive) return

	const closeModal = event => {
		if (event.target.id === 'modal-window-overlay') {
			setModalIsActive(false)
		}
		return
	}

	return ReactDOM.createPortal(
		<div id='modal-window-overlay' onClick={closeModal}>
			<div id='modal-window'>
				<div className='py-2 flex justify-end'>
					<IoMdClose
						fontSize={20}
						className='cursor-pointer hover'
						onClick={() => setModalIsActive(false)}
					/>
				</div>
				{children}
			</div>
		</div>,
		document.body
	)
}

export default ModalComponent
