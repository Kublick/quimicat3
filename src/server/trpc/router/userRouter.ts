import bcrypt from "bcryptjs";
import { userValidation } from "../../../intefaces";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  createUser: publicProcedure
    .input(userValidation)
    .mutation(async ({ ctx, input }) => {
      const hashedPassword: string = await bcrypt.hash(input.password, 10);

      return ctx.prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        status: z.enum(["activo", "inactivo"]),
        profileId: z.string(),
        sucursalId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  getUserById: publicProcedure
    .input(
      z.object({
        id: z.string().nullish(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;

      if (id) {
        const user = ctx.prisma.user.findFirstOrThrow({
          where: {
            id,
          },
        });
        // const userWithoutPassword = exclude(user, "password");
        return user;
      }
    }),
});

// function exclude<User, Key extends keyof User>(
//   user: User,
//   ...keys: Key[]
// ): Omit<User, Key> {
//   for (const key of keys) {
//     delete user[key];
//   }
//   return user;
// }
