export const stringifyDate = date => {
	const dateObject = new Date(date);
	return `${dateObject.getDate()}-${
		dateObject.getMonth() >= 10
			? dateObject.getMonth() + 1
			: "0" + (dateObject.getMonth() + 1)
	}-${dateObject.getFullYear()}`;
};
