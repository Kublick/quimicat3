import { profileValidation } from "../../intefaces/profile";
import { createRouter } from "./context";

export const securityRouter = createRouter()
  .query("getSucursales", {
    async resolve({ ctx }) {
      return await ctx.prisma.sucursal.findMany();
    },
  })
  .query("getProfiles", {
    async resolve({ ctx }) {
      return await ctx.prisma.profile.findMany();
    },
  })
  .query("getUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany({
        include: {
          Profile: true,
          Sucursal: true,
        },
      });
    },
  })
  .mutation("createProfile", {
    input: profileValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.profile.create({
        data: {
          id: input.id,
          nombre: input.nombre,
          enabledFeatures: { ...input.enabledFeatures },
        },
      });
    },
  })
  .mutation("profileUpdate", {
    input: profileValidation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.profile.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    },
  });
