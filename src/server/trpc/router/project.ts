import { z } from "zod";
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
  getProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log(input.id);
      const project = await ctx.prisma.project.findFirst({
        where: {
          id: input.id,
        },
      });
      return project;
    }),
});
