import { prisma } from '../src/server/db/client';

const createSucursales = async () => {
	await prisma.sucursal.createMany({
		data: [{ nombre: 'Matriz' }, { nombre: 'Gpe Victoria' }],
	});
};

const createPerfiles = async () => {
	await prisma.profile.createMany({
		data: [
			{
				nombre: 'Admin',
				enabledFeatures: ['showProfile', 'addUpdateProfile', 'deleteProfile'],
			},
			{
				nombre: 'User',
				enabledFeatures: [],
			},
		],
	});
};

async function main() {
	await createSucursales();
	await createPerfiles();
}

main();
