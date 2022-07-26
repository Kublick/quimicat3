import { z } from 'zod';

export const perfilValidation = z.object({
	id: z.string().optional(),
	codigo: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	abreviatura: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	descripcion: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	titulo: z.string(),
	metodoId: z.string(),
	ventaIndividual: z.boolean(),
	sexo: z.string(),
	notas: z.string(),
	notasInternas: z.string(),
	alineacion: z.string(),
	testsToDo: z.array(
		z.object({
			value: z.string(),
			label: z.string(),
		}),
	),
});

export type IPerfil = z.infer<typeof perfilValidation>;
