import { Link } from "react-router-dom";

function GoBackLink() {
	return (
		<Link to=".." className="flex items-center gap-2 my-10 group w-max">
			<div className="bg-[#ebebeb] h-[40px] w-[40px] rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
				<span className="material-icons ms-[6px] text-sm">arrow_back_ios</span>
			</div>
			Orqaga
		</Link>
	);
}

export default GoBackLink;
