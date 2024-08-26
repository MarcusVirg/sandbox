enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export type User = {
	id: string
	role: UserRole
	email: string
	name: string
	avatar_url: string
}
