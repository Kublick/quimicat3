import { profileValidation } from "../../../intefaces";
import { router, protectedProcedure } from "../trpc";

export const securityRouter = router({
  getSucursales: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.sucursal.findMany();
  }),
  getProfiles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findMany();
  }),
  getUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        Profile: true,
        Sucursal: true,
      },
    });
  }),
  createProfile: protectedProcedure
    .input(profileValidation)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.profile.create({
        data: {
          nombre: input.nombre,
          enabledFeatures: { ...input.enabledFeatures },
        },
      });
    }),
  profileUpdate: protectedProcedure
    .input(profileValidation)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.profile.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
});
