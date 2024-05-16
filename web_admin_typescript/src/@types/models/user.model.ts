export interface IUserModel {
	email: string;
	phone: string;
	password: string;
	role: "Super Admin" | "Admin" | "Residents";
	role_details?: string;
	first_name: string;
	last_name: string;
	municipality_number: string;
}
