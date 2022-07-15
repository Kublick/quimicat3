import { departamentoValidation } from "../../intefaces/departamento";
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
  });

// .query("getProfiles", {
//   async resolve({ ctx }) {
//     return await ctx.prisma.profile.findMany();
//   },
// })
// .query("getUsers", {
//   async resolve({ ctx }) {
//     return await ctx.prisma.user.findMany({
//       include: {
//         Profile: true,
//         Sucursal: true,
//       },
//     });
//   },
// })
// .mutation("createProfile", {
//   input: profileValidation,
//   async resolve({ input, ctx }) {
//     return await ctx.prisma.profile.create({
//       data: {
//         id: input.id,
//         nombre: input.nombre,
//         enabledFeatures: { ...input.enabledFeatures },
//       },
//     });
//   },
// })
// .mutation("profileUpdate", {
//   input: profileValidation,
//   async resolve({ input, ctx }) {
//     return await ctx.prisma.profile.update({
//       where: { id: input.id },
//       data: {
//         ...input,
//       },
//     });
//   },
// });
