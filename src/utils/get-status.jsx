export function getStatus(status) {
	const statusList = {
		superuser: "Superadmin",
		admin: "Admin",
		teacher: "Ustoz",
	};
	return statusList[status];
}
