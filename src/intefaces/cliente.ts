import { z } from "zod";

export const clienteValidation = z.object({
  id: z.string().optional(),
  abreviatura: z.string().min(3, { message: "Minimo 3 caracteres" }),
  nombre: z.string(),
  email: z.string().email({ message: "Ingrese un correo valido" }),
  telefono: z.string(),
  direccion: z.string(),
  tipo: z.string(),
  rfc: z.string(),
  tarifaId: z.string(),
  tarifa: z.string().optional(),
});

export type ICliente = z.infer<typeof clienteValidation>;
