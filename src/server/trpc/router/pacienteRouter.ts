import shortIdGenerator from "../../../components/ui/utils/shortIdGenerator";
import { pacienteValidation } from "../../../intefaces";
import { router, protectedProcedure } from "../trpc";

export const pacienteRouter = router({
  getPacientes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.paciente.findMany();
  }),
  createPaciente: protectedProcedure
    .input(pacienteValidation)
    .mutation(async ({ ctx, input }) => {
      let shortId = shortIdGenerator(
        input.nombre,
        input.apellidos,
        input.fechaNacimiento,
        false
      );

      const find = await ctx.prisma.paciente.findFirst({
        where: {
          clave: shortId,
        },
      });
      if (find) {
        shortId = shortIdGenerator(
          input.nombre,
          input.apellidos,
          input.fechaNacimiento,
          true
        );
      }
      return await ctx.prisma.paciente.create({
        data: {
          ...input,
          fechaNacimiento: new Date(input.fechaNacimiento),
          clave: shortId,
        },
      });
    }),
  updatePaciente: protectedProcedure
    .input(pacienteValidation)
    .mutation(async ({ ctx, input }) => {
      const find = await ctx.prisma.paciente.findFirst({
        where: {
          clave: input.clave,
        },
      });

      if (find?.id === input.id) {
        return await ctx.prisma.paciente.update({
          where: { id: input.id },
          data: {
            ...input,
            fechaNacimiento: new Date(input.fechaNacimiento),
          },
        });
      }
    }),
});
