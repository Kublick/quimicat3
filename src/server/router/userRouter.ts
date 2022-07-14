import { createRouter } from "./context";
import bcrypt from "bcryptjs";
import { IUser, userValidation } from "../../intefaces/user";
import { z, ZodLazy } from "zod";

export const userRouter = createRouter()
  .mutation("createUser", {
    input: userValidation,
    async resolve({ input, ctx }) {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      return await ctx.prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });
    },
  })
  .mutation("updateUser", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
      status: z.enum(["activo", "inactivo"]),
      profileId: z.string(),
      sucursalId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  })
  .query("getAllUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .query("getUserById", {
    input: z.object({
      id: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      console.log(input);
      const { id } = input;
      if (id) {
        const user = await ctx.prisma.user.findFirstOrThrow({
          where: {
            id,
          },
        });
        const userWithOutPassword = exclude(user, "password");
        return userWithOutPassword;
      }
    },
  });

function exclude<IUser, Key extends keyof IUser>(
  user: IUser,
  ...keys: Key[]
): Omit<IUser, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
