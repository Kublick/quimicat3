import shortIdGenerator from "../../components/ui/utils/shortIdGenerator";
import { pacienteValidation } from "../../intefaces";
import { createRouter } from "./context";

export const pacienteRouter = createRouter()
  .query("getPacientes", {
    async resolve({ ctx }) {
      return await ctx.prisma.paciente.findMany();
    },
  })
  .mutation("createPaciente", {
    input: pacienteValidation,
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation("updatePaciente", {
    input: pacienteValidation,
    async resolve({ input, ctx }) {
      const find = await ctx.prisma.paciente.findFirst({
        where: {
          clave: input.clave,
        },
      });

      let shortId = shortIdGenerator(
        input.nombre,
        input.apellidos,
        input.fechaNacimiento,
        false
      );

      if (find?.id === input.id) {
        return await ctx.prisma.paciente.update({
          where: { id: input.id },
          data: {
            ...input,
            fechaNacimiento: new Date(input.fechaNacimiento),
          },
        });
      }

      if (find) {
        shortId = shortIdGenerator(
          input.nombre,
          input.apellidos,
          input.fechaNacimiento,
          true
        );
      }

      return await ctx.prisma.paciente.update({
        where: { id: input.id },
        data: {
          ...input,
          fechaNacimiento: new Date(input.fechaNacimiento),
          clave: shortId,
        },
      });
    },
  });
