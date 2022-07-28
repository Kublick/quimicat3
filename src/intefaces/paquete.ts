import { z } from 'zod';

export const paqueteValidation = z.object({
	id: z.string().optional(),
	abreviatura: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	descripcion: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	indicaciones: z.string(),
	notasInternas: z.string(),
	testsToDo: z.array(
		z.object({
			value: z.string(),
			label: z.string(),
		}),
	),
});

export type IPaquete = z.infer<typeof paqueteValidation>;
