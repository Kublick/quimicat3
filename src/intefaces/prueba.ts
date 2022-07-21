import { z } from 'zod';

export const pruebaValidation = z.object({
	id: z.string().optional(),
	codigo: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	abreviatura: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	descripcion: z.string().min(3, { message: 'Minimo 3 caracteres' }),
	titulo: z.string(),
	hojaTrabajo: z.string(),
	departamentoId: z.string().min(1),
	muestraId: z.string(),
	metodoId: z.string(),
	printMetodo: z.string(),
	formula: z.string(),
	printBold: z.string(),
	unidades: z.string(),
	sexo: z.string(),
	tipoResultado: z.string(),
	resultadoDefault: z.string(),
	valorTipo: z.string(),
	decimales: z.number(),
	indicaciones: z.string(),
	notas: z.string(),
	printNotas: z.string(),
	notasInternas: z.string(),
	tipoValorNormalidad: z.string(),
	valorNormalidadTexto: z.string(),
	valoresRangos: z.object().optional(),
	ventaIndividual: z.boolean().optional(),
	permitirAntibiograma: z.boolean().optional(),
});

export type IPrueba = z.infer<typeof pruebaValidation>;

export const pruebaValorRangoValidation = z.object({
	id: z.string().optional(),
	sexo: z.string(),
	unidad: z.string(),
	edadMaxima: z.number(),
	edadMinima: z.number(),
	refMaxima: z.number(),
	refMinima: z.number(),
});

export type IPruebaValorRango = z.infer<typeof pruebaValorRangoValidation>;
