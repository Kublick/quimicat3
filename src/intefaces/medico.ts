import { z } from "zod";

export const medicoValidation = z.object({
  id: z.string().optional(),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
  especialidad: z.string().min(3, { message: "Minimo 3 caracteres" }),
  telefono: z.string(),
  email: z.string().email({ message: "Email invalido" }),
});

export type IMedico = z.infer<typeof medicoValidation>;
