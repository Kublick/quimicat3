import { prisma } from '../src/server/db/client';

type SucursalData = {
	nombre: string;
}[];

const sucursalesData: SucursalData = [
	{
		nombre: 'Matriz',
	},
	{
		nombre: 'Gpe Victoria',
	},
];

const createSucursales = async () => {
	await prisma.sucursal.createMany({
		data: [{ nombre: 'Matriz' }, { nombre: 'Gpe Victoria' }],
	});
};

async function main() {
	await createSucursales();
}

main();
