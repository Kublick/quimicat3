import { z } from "zod";

export const pruebaValidation = z.object({
  id: z.string().optional(),
  codigo: z.string().min(3, { message: "Minimo 3 caracteres" }),
  abreviatura: z.string().min(3, { message: "Minimo 3 caracteres" }),
  descripcion: z.string().min(3, { message: "Minimo 3 caracteres" }),
  titulo: z.string(),
  hojaTrabajo: z.string(),
  departamentoId: z.string(),
  muestraId: z.string(),
  metodoId: z.string(),
  printMetodo: z.boolean(),
  formula: z.string(),
  printBold: z.boolean(),
  unidades: z.string(),
  sexo: z.string(),
  tipoResultado: z.string(),
  resultadoDefault: z.string(),
  valorTipo: z.string(),
  decimales: z.number(),
  indicaciones: z.string(),
  notas: z.string(),
  printNotas: z.boolean(),
  notasInternas: z.string(),
  tipoValorNormalidad: z.string(),
  valorNormalidadTexto: z.string(),
  valoresRangos: z.array(z.string()),
  ventaIndividual: z.boolean(),
  permitirAntibiograma: z.boolean(),
});

export type IPrueba = z.infer<typeof pruebaValidation>;
