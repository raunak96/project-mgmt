import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      where: {
        clientId: ctx.session.user.id,
      },
    });
    return projects;
  }),
});
