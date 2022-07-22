import { profileValidation } from "../../intefaces";
import { medicoValidation } from "../../intefaces/medico";
import { createRouter } from "./context";

export const medicoRouter = createRouter()
  .query("getMedicos", {
    async resolve({ ctx }) {
      return await ctx.prisma.medico.findMany();
    },
  })
  .mutation("createMedico", {
    input: medicoValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.medico.create({
        data: {
          ...input,
        },
      });
    },
  })
  .mutation("updateMedico", {
    input: medicoValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.medico.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  });
