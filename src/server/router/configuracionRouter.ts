import {
	metodoValidation,
	departamentoValidation,
	muestrasValidation,
	pruebaValidation,
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
			console.log('entro');
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
			console.log('entro');
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
	.mutation('createPrueba', {
		input: pruebaValidation,
		async resolve({ input, ctx }) {
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
			console.log('manda input', input);

			let valorRango = {
				id: 'indistinto',
				sexo: 'indistinto',
				unidad: '1',
				edadMaxima: 1,
				edadMinima: 100,
				refMaxima: 2,
				refMinima: 200,
			};

			return await ctx.prisma.prueba.update({
				where: { id: input.id },
				data: {
					...input,
					valoresRangos: valorRango,
				},
			});
		},
	});
