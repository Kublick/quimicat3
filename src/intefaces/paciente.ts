import { z } from "zod";

export const pacienteValidation = z.object({
  id: z.string().optional(),
  clave: z.string(),
  clienteId: z.string().min(1, { message: "Campo requerido" }),
  nombre: z.string().min(3, { message: "Minimo 3 caracteres" }),
  apellidos: z.string().min(3, { message: "Minimo 3 caracteres" }),
  genero: z.string().min(1, { message: "Campo requerido" }),
  fechaNacimiento: z.string().min(1, { message: "Campo requerido" }),
  celular: z.string(),
  comentarios: z.string().nullable(),
  tutor: z.string().nullable(),
  emailResultados: z.string(),
  direccion: z.string(),
});

export type IPaciente = z.infer<typeof pacienteValidation>;
