export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	status: string;
	profileImage: string;
	isStaff: boolean;
	isSuperuser: boolean;
};

export type ResponseUser = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	job: string;
	profile_picture: string;
	is_staff: boolean;
	is_superuser: boolean;
};
