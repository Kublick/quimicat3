import { createRouter } from "./context";
import bcrypt from "bcryptjs";
import { IUser, userValidation } from "../../intefaces/user";

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
  .query("getAllUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  });
