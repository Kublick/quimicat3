import { z } from "zod";

export const userValidation = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Minimo 3 caracteres" }),
  password: z
    .string()
    .min(3, { message: "Minimo 3 caracteres" })
    .max(12, { message: "Maximo 12 caracteres" }),
  username: z
    .string()
    .min(6, { message: "Minimo 6 caracteres" })
    .max(12, { message: "Maximo 12 caracteres" }),
  role: z.string().optional(),
  status: z.enum(["activo", "inactivo"]),
  sucursalId: z.string(),
  profileId: z.string(),
});

export type IUser = z.infer<typeof userValidation>;
