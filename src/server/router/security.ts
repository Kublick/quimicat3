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
  });
