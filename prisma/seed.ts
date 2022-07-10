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
				enabledFeatures: {
					security: ['showPerfil', 'addUpdatePerfil', 'deletePerfil'],
					users: [
						'showUser',
						'addUpdateUser',
						'deleteUser',
						'showUsers',
						'addUpdateUsers',
						'deleteUsers',
					],
					patients: ['showPatients', 'addUpdatePatients', 'deletePatients'],
					config: [
						'showConfigPerfiles',
						'addUpdateConfigPerfiles',
						'deleteConfigPerfiles',
						'showConfigPruebas',
						'addUpdateConfigPruebas',
						'deleteConfigPrueba',
						'configDepartamento',
						'configMetodo',
					],
					medicos: [
						'addMedico',
						'showMedicos',
						'addUpdateMedicos',
						'deleteMedicos',
					],
					cliente: ['showClientes', 'addUpdateClientes'],
				},
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
