import bcrypt from 'bcryptjs';
import { prisma } from '../server/db/client';

export const checkUserPassword = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return null;
	}

	if (!bcrypt.compareSync(password, user.password)) {
		return null;
	}

	const { id, name } = user;

	return {
		id,
		name,
		email: user.email,
	};
};
