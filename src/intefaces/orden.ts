import { z } from "zod";

export const ordenValidation = z.object({
  id: z.string().optional(),
  clienteId: z.string(),
  pacienteId: z.string(),
  medicoId: z.string(),
  tarifaId: z.string(),
  orderGeneratorId: z.string(),
  fecha: z.string(),
  tipo: z.string(),
  folioCliente: z.string(),
  diagnostico: z.string(),
  horaToma: z.string(),
  horaEntegra: z.string(),
  factura: z.boolean(),
  notas: z.string(),
  age: z.number(),
  testResults: z.array(z.string()),
  testRequested: z.array(z.string()),
  envio: z.array(z.string()),
});

export type IOrden = z.infer<typeof ordenValidation>;
