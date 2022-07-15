import { z } from "zod";

export const profileValidation = z.object({
  id: z.string().optional(),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
  enabledFeatures: z
    .object({
      security: z.array(z.string()),
      users: z.array(z.string()),
      patients: z.array(z.string()),
      config: z.array(z.string()),
      cliente: z.array(z.string()),
      medicos: z.array(z.string()),
    })
    .optional(),
});

export type IProfile = z.infer<typeof profileValidation>;
