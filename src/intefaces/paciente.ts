import { z } from "zod";

export const pacienteValidation = z.object({
  id: z.string().optional(),
  clave: z.string().optional(),
  clienteId: z.string(),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
  apellidos: z.string(),
  genero: z.string(),
  fechaNacimiento: z.string(),
  celular: z.string(),
  comentarios: z.string().nullable(),
  tutor: z.string().nullable(),
});

export type IPaciente = z.infer<typeof pacienteValidation>;
