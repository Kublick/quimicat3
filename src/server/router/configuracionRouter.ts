import { z } from 'zod';
import {
	metodoValidation,
	departamentoValidation,
	muestrasValidation,
	pruebaValidation,
	tarifaValidation,
	perfilValidation,
	paqueteValidation,
} from '../../intefaces';
import { createRouter } from './context';

export const configuracionRouter = createRouter()
	.query('getDepartamentos', {
		async resolve({ ctx }) {
			return await ctx.prisma.departamento.findMany();
		},
	})
	.mutation('createDepartamento', {
		input: departamentoValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.departamento.create({
				data: {
					nombre: input.nombre,
				},
			});
		},
	})
	.mutation('updateDepartamento', {
		input: departamentoValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.departamento.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.query('getMetodos', {
		async resolve({ ctx }) {
			return await ctx.prisma.metodo.findMany();
		},
	})
	.mutation('createMetodo', {
		input: metodoValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.metodo.create({
				data: {
					nombre: input.nombre,
				},
			});
		},
	})
	.mutation('updateMetodo', {
		input: metodoValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.metodo.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.query('getMuestras', {
		async resolve({ ctx }) {
			return await ctx.prisma.muestra.findMany();
		},
	})
	.mutation('createMuestra', {
		input: muestrasValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.muestra.create({
				data: {
					...input,
				},
			});
		},
	})
	.mutation('updateMuestra', {
		input: muestrasValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.muestra.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.query('getPruebas', {
		async resolve({ ctx }) {
			return await ctx.prisma.prueba.findMany({
				include: {
					departamento: true,
				},
			});
		},
	})
	.query('getPruebasPerfil', {
		async resolve({ ctx }) {
			return await ctx.prisma.prueba.findMany({
				include: {
					departamento: true,
					metodo: true,
					muestra: true,
				},
			});
		},
	})
	.mutation('createPrueba', {
		input: pruebaValidation,
		async resolve({ input, ctx }) {
			if (input.ventaIndividual) {
				const prueba = await ctx.prisma.prueba.create({
					data: {
						...input,
					},
				});

				await ctx.prisma.items.create({
					data: {
						pruebaId: prueba.id,
					},
				});
				return prueba;
			}
			return await ctx.prisma.prueba.create({
				data: {
					...input,
				},
			});
		},
	})
	.mutation('updatePrueba', {
		input: pruebaValidation,
		async resolve({ input, ctx }) {
			const checkPrevious = await ctx.prisma.prueba.findFirst({
				where: {
					id: input.id,
				},
			});

			if (
				checkPrevious?.ventaIndividual === true &&
				input.ventaIndividual === false
			) {
				await ctx.prisma.items.deleteMany({
					where: {
						pruebaId: input.id,
					},
				});
			}

			if (input.ventaIndividual) {
				if (
					checkPrevious?.ventaIndividual === false &&
					input.ventaIndividual === true
				) {
					await ctx.prisma.items.create({
						data: {
							pruebaId: input.id,
						},
					});
				}
			}

			return await ctx.prisma.prueba.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.query('getTarifas', {
		async resolve({ ctx }) {
			return await ctx.prisma.tarifa.findMany();
		},
	})
	.mutation('createTarifa', {
		input: tarifaValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.tarifa.create({
				data: {
					...input,
				},
			});
		},
	})
	.mutation('updateTarifa', {
		input: tarifaValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.tarifa.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.query('getPerfiles', {
		async resolve({ ctx }) {
			return await ctx.prisma.perfil.findMany({
				include: {
					metodo: true,
				},
			});
		},
	})
	.mutation('createPerfil', {
		input: perfilValidation,
		async resolve({ input, ctx }) {
			const perfil = await ctx.prisma.perfil.create({
				data: {
					...input,
				},
			});

			if (input.ventaIndividual) {
				await ctx.prisma.items.create({
					data: {
						perfilId: perfil.id,
					},
				});
			}

			return perfil;
		},
	})
	.mutation('updatePerfil', {
		input: perfilValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.perfil.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.query('getItemsTarifas', {
		input: z.object({
			tarifaId: z.string(),
		}),
		async resolve({ input, ctx }) {
			const items = await ctx.prisma.items.findMany();

			console.log(items);

			const itemsTarifa = await ctx.prisma.itemsTarifa.findMany({
				where: {
					tarifaId: input.tarifaId,
				},
			});

			let filter = items.filter(
				(item) =>
					!itemsTarifa.find((itemsTarifa) => itemsTarifa.itemId === item.id),
			);

			if (filter.length > 0) {
				await ctx.prisma.itemsTarifa.createMany({
					data: filter.map((item) => ({
						itemId: item.id,
						tarifaId: input.tarifaId,
						precio: 0,
					})),
				});
			}

			return await ctx.prisma.itemsTarifa.findMany({
				where: {
					tarifa: {
						id: input.tarifaId,
					},
				},
				include: {
					item: {
						include: {
							prueba: true,
							paquete: true,
							perfil: true,
						},
					},
				},
			});
		},
	})
	.query('getPaquetes', {
		async resolve({ ctx }) {
			return await ctx.prisma.paquete.findMany();
		},
	})
	.mutation('createPaquete', {
		input: paqueteValidation,
		async resolve({ input, ctx }) {
			const paquete = await ctx.prisma.paquete.create({
				data: {
					...input,
				},
			});

			await ctx.prisma.items.create({
				data: {
					paqueteId: paquete.id,
				},
			});

			return paquete;
		},
	})
	.mutation('updatePaquete', {
		input: paqueteValidation,
		async resolve({ input, ctx }) {
			return await ctx.prisma.paquete.update({
				where: { id: input.id },
				data: {
					...input,
				},
			});
		},
	})
	.mutation('updatePrecio', {
		input: z.object({
			id: z.string(),
			precio: z.number(),
		}),

		async resolve({ input, ctx }) {
			let items = [
				{
					id: 'cl66xobhb0356p8vrwxmfisgr',
					precio: 0,
				},
				{
					id: 'cl66xcgzi0120p8vrlyce72ol',
					precio: 0,
				},
				{
					id: 'cl66xobhb0355p8vr6bdkna8o',
					precio: 0,
				},
			];

			for (let key in items) {
				console.log(
					'🚀 ~ file: configuracionRouter.ts ~ line 292 ~ resolve ~ input',
					input,
				);
				console.log('valor key', key);

				await ctx.prisma.itemsTarifa.update({
					where: { id: input.id },
					data: {
						precio: input.precio,
					},
				});
			}
		},
	});
