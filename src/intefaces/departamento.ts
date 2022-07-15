import { z } from "zod";

export const departamentoValidation = z.object({
  id: z.string().optional(),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
});

export type IDepartamento = z.infer<typeof departamentoValidation>;
