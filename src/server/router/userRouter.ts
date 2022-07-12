import { createRouter } from "./context";
import bcrypt from "bcryptjs";
import { userValidationSchema } from "../../pages/auth/register";
import { userValidation } from "../../intefaces/user";

export const userRouter = createRouter()
  .mutation("createUser", {
    input: userValidation,
    async resolve({ input, ctx }) {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      let newUser = { ...input, password: hashedPassword };

      console.log(newUser);

      const user = await ctx.prisma.user.create({
        data: {
          ...newUser,
        },
      });

      console.log(user);

      return user;
    },
  })
  .query("getAllUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  });
