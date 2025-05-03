export type User = {
	id: string;
	name: string;
	email: string;
	password_hash: string;
	auth_provider: number;
	created_at: Date;
};
