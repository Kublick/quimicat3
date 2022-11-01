import { medicoValidation } from "../../../intefaces/medico";
import { router, publicProcedure } from "../trpc";

export const medicoRouter = router({
  getMedicos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.medico.findMany();
  }),
  createMedico: publicProcedure
    .input(medicoValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.medico.create({
        data: {
          ...input,
        },
      });
    }),
  updateMedico: publicProcedure
    .input(medicoValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.medico.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
});
