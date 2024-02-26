import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
	const { status, statusText: message } = useRouteError()

	return (
		<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
			<h1 className='text-xl flex flex-row gap-2'>
				<b className='text-center'>{status}</b>|
				<p className='text-center'> {message}</p>
			</h1>
			<br />
			<Link
				to='/'
				className='max-w-max p-4 border border-white rounded-[0.4rem] flex items-center justify-center'
			>
				Bosh sahifaga qaytish
			</Link>
		</div>
	)
}

export default ErrorPage
