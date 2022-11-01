import { z } from "zod";
import {
  metodoValidation,
  departamentoValidation,
  muestrasValidation,
  pruebaValidation,
  tarifaValidation,
  perfilValidation,
  paqueteValidation,
} from "../../../intefaces";
import { router, protectedProcedure } from "../trpc";

export const configuracionRouter = router({
  getDepartamentos: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.departamento.findMany();
  }),
  getTarifas: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tarifa.findMany();
  }),
  getPruebasPerfil: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.prueba.findMany({
      include: {
        departamento: true,
        metodo: true,
        muestra: true,
      },
    });
  }),
  createDepartamento: protectedProcedure
    .input(departamentoValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.departamento.create({
        data: {
          nombre: input.nombre,
        },
      });
    }),
  updateDepartamento: protectedProcedure
    .input(departamentoValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.departamento.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  getMetodos: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.metodo.findMany();
  }),
  createMetodo: protectedProcedure
    .input(metodoValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.metodo.create({
        data: {
          nombre: input.nombre,
        },
      });
    }),
  updateMetodo: protectedProcedure
    .input(metodoValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.metodo.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  getMuestras: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.muestra.findMany();
  }),
  createMuestra: protectedProcedure
    .input(muestrasValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.muestra.create({
        data: {
          ...input,
        },
      });
    }),
  updateMuestra: protectedProcedure
    .input(muestrasValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.muestra.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  getPruebas: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.prueba.findMany({
      include: {
        departamento: true,
      },
    });
  }),
  createPrueba: protectedProcedure
    .input(pruebaValidation)
    .mutation(async ({ ctx, input }) => {
      if (input.ventaIndividual) {
        const prueba = await ctx.prisma.prueba.create({
          data: {
            ...input,
          },
        });

        await ctx.prisma.items.create({
          data: {
            pruebaId: prueba.id,
          },
        });
        return prueba;
      }
      return await ctx.prisma.prueba.create({
        data: {
          ...input,
        },
      });
    }),
  updatePrueba: protectedProcedure
    .input(pruebaValidation)
    .mutation(async ({ ctx, input }) => {
      const checkPrevious = await ctx.prisma.prueba.findFirst({
        where: {
          id: input.id,
        },
      });

      if (
        checkPrevious?.ventaIndividual === true &&
        input.ventaIndividual === false
      ) {
        await ctx.prisma.items.deleteMany({
          where: {
            pruebaId: input.id,
          },
        });
      }

      if (input.ventaIndividual) {
        if (
          checkPrevious?.ventaIndividual === false &&
          input.ventaIndividual === true
        ) {
          await ctx.prisma.items.create({
            data: {
              pruebaId: input.id,
            },
          });
        }
      }

      return await ctx.prisma.prueba.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  createTarifa: protectedProcedure
    .input(tarifaValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.tarifa.create({
        data: {
          ...input,
        },
      });
    }),
  updateTarifa: protectedProcedure
    .input(tarifaValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.tarifa.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  getPerfiles: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.perfil.findMany({
      include: {
        metodo: true,
      },
    });
  }),
  createPerfil: protectedProcedure
    .input(perfilValidation)
    .mutation(async ({ input, ctx }) => {
      const perfil = await ctx.prisma.perfil.create({
        data: {
          ...input,
        },
      });
      if (input.ventaIndividual) {
        await ctx.prisma.items.create({
          data: {
            perfilId: perfil.id,
          },
        });
      }

      return perfil;
    }),
  updatePerfil: protectedProcedure
    .input(perfilValidation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.perfil.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  getItemsTarifas: protectedProcedure
    .input(z.object({ tarifaId: z.string() }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.items.findMany();
      const itemsTarifa = await ctx.prisma.itemsTarifa.findMany({
        where: {
          tarifaId: input.tarifaId,
        },
      });

      const filter = items.filter(
        (item) =>
          !itemsTarifa.find((itemsTarifa) => itemsTarifa.itemId === item.id)
      );

      if (filter.length > 0) {
        await ctx.prisma.itemsTarifa.createMany({
          data: filter.map((item) => ({
            itemId: item.id,
            tarifaId: input.tarifaId,
            precio: 0,
          })),
        });
      }

      return await ctx.prisma.itemsTarifa.findMany({
        where: {
          tarifa: {
            id: input.tarifaId,
          },
        },
        include: {
          item: {
            include: {
              prueba: true,
              paquete: true,
              perfil: true,
            },
          },
        },
      });
    }),

  getPaquetes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.paquete.findMany();
  }),
  createPaquete: protectedProcedure
    .input(paqueteValidation)
    .mutation(async ({ ctx, input }) => {
      const paquete = await ctx.prisma.paquete.create({
        data: {
          ...input,
        },
      });

      await ctx.prisma.items.create({
        data: {
          paqueteId: paquete.id,
        },
      });

      return paquete;
    }),
  updatePaquete: protectedProcedure
    .input(paqueteValidation)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.paquete.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  updatePrecio: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          precio: z.number(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      await Promise.all(
        input.map((item) =>
          ctx.prisma.itemsTarifa.update({
            where: { id: item.id },
            data: {
              precio: item.precio,
            },
          })
        )
      );
    }),
});
