function Card({ children, className }) {
	return (
		<div className={`p-10 bg-[#f5f5f5] rounded-3xl ` + className}>
			{children}
		</div>
	);
}

export default Card;
