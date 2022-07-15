import { z } from "zod";

export const metodoValidation = z.object({
  id: z.string().optional(),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
});

export type IMetodo = z.infer<typeof metodoValidation>;
