import { z } from "zod";

export const muestrasValidation = z.object({
  id: z.string().optional(),
  clave: z.string().min(3, { message: "Minimo 3 caracteres" }),
  descripcion: z.string().min(3, { message: "Minimo 3 caracteres" }),
  nombreTubo: z.string().min(3, { message: "Minimo 3 caracteres" }),
  observaciones: z.string(),
  barCode: z.boolean(),
  excludeStatus: z.boolean(),
  startAsPending: z.boolean(),
});

export type IMuestra = z.infer<typeof muestrasValidation>;
