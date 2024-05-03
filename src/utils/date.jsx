export const stringifyDate = date => {
	const dateObject = new Date(date);
	return `${
		dateObject.getDate() >= 10
			? dateObject.getDate()
			: "0" + dateObject.getDate()
	}-${
		dateObject.getMonth() >= 10
			? dateObject.getMonth() + 1
			: "0" + (dateObject.getMonth() + 1)
	}-${dateObject.getFullYear()}`;
};
