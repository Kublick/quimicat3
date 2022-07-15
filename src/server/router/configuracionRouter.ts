import { departamentoValidation } from "../../intefaces/departamento";
import { metodoValidation } from "../../intefaces/metodo";
import { createRouter } from "./context";

export const configuracionRouter = createRouter()
  .query("getDepartamentos", {
    async resolve({ ctx }) {
      return await ctx.prisma.departamento.findMany();
    },
  })
  .mutation("createDepartamento", {
    input: departamentoValidation,
    async resolve({ input, ctx }) {
      console.log("entro");
      return await ctx.prisma.departamento.create({
        data: {
          nombre: input.nombre,
        },
      });
    },
  })
  .mutation("updateDepartamento", {
    input: departamentoValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.departamento.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  })
  .query("getMetodos", {
    async resolve({ ctx }) {
      return await ctx.prisma.metodo.findMany();
    },
  })
  .mutation("createMetodo", {
    input: metodoValidation,
    async resolve({ input, ctx }) {
      console.log("entro");
      return await ctx.prisma.metodo.create({
        data: {
          nombre: input.nombre,
        },
      });
    },
  })
  .mutation("updateMetodo", {
    input: metodoValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.metodo.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  });
