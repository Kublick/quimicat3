import { createRouter } from "./context";
import { z } from "zod";

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
      return await ctx.prisma.user.findMany();
    },
  });
