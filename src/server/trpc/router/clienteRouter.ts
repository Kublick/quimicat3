import { clienteValidation } from "../../../intefaces";
import { router, protectedProcedure } from "../trpc";

export const clienteRouter = router({
  getClientes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.cliente.findMany({
      include: {
        tarifa: true,
      },
    });
  }),
  createCliente: protectedProcedure
    .input(clienteValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.cliente.create({
        data: { ...input },
      });
    }),
  updateCliente: protectedProcedure
    .input(clienteValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.cliente.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
});
