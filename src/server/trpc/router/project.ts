import { Status } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

const StatusEnum = z.nativeEnum(Status);
type StatusEnum = z.infer<typeof StatusEnum>;
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
  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.project.delete({
        where: { id_clientId: { id: input.id, clientId: ctx.session.user.id } },
      });
      return { success: true };
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        status: StatusEnum,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, status } = input;
      const project = await ctx.prisma.project.update({
        where: {
          id_clientId: { id: input.id, clientId: ctx.session.user.id },
        },
        data: {
          name,
          description,
          status,
        },
      });
      return project;
    }),
});
