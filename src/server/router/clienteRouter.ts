import { profileValidation } from "../../intefaces";
import { clienteValidation } from "../../intefaces";
import { createRouter } from "./context";

export const clienteRouter = createRouter()
  .query("getClientes", {
    async resolve({ ctx }) {
      return await ctx.prisma.cliente.findMany({
        include: {
          tarifa: true,
        },
      });
    },
  })
  .mutation("createCliente", {
    input: clienteValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.cliente.create({
        data: {
          ...input,
        },
      });
    },
  })
  .mutation("updateCliente", {
    input: clienteValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.cliente.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  });
