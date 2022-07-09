import bcrypt from 'bcryptjs';
import { prisma } from '../server/db/client';

export const checkUserPassword = async (username: string, password: string) => {
	console.log(username, password);

	const user = await prisma.user.findFirstOrThrow({
		where: {
			username,
		},
		include: {
			Profile: true,
			Sucursal: true,
		},
	});

	if (!user) {
		return null;
	}

	if (!bcrypt.compareSync(password, user.password)) {
		return null;
	}

	let enabledFeatures = user.Profile?.enabledFeatures;
	let sucursal = user.Sucursal?.nombre;

	const { id, name } = user;

	return {
		id,
		name,
		username,
		enabledFeatures,
		sucursal,
	};
};
