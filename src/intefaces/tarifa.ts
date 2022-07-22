import { z } from "zod";

export const tarifaValidation = z.object({
  id: z.string().optional(),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
  descripcion: z.string().min(3, { message: "Minimo 3 caracteres" }),
  isDefault: z.boolean(),
});

export type ITarifa = z.infer<typeof tarifaValidation>;
