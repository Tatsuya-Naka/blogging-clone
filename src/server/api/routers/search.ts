import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";

export const TopicRouter = createTRPCRouter({
    getTopicLists: publicProcedure
        .input(z.object({
            term: z.string(), 
        }))
        .query(async({ctx, input}) => {
            return await ctx.db.topic.findMany({
                where: {
                    title: {
                        contains: input.term,
                        mode: 'insensitive',
                    },
                    isPublic: true,
                },
                take: 5,
            });
        })
});