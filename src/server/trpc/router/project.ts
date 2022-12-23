import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      where: {
        clientId: ctx.session.user.id,
      },
      orderBy: {
        updated_at: "desc",
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
          clientId: ctx.session.user.id,
        },
      });
      if (!project)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this resource",
        });
      return project;
    }),
  addProject: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      const project = await ctx.prisma.project.create({
        data: {
          name,
          description,
          client: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return project;
    }),
});
