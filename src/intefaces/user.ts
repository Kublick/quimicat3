import { z } from "zod";

export const userValidation = z.object({
  name: z.string().min(3),
  password: z.string().min(3).max(12),
  username: z.string().min(6).max(12),
  status: z.enum(["active", "inactive"]),
  sucursalId: z.string(),
  profileId: z.string(),
});

export type IUser = z.infer<typeof userValidation>;
