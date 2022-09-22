import { createRouter } from './context'
import { z } from 'zod'

export const itemsRouter = createRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.item.findMany()
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string().min(2),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.item.create({
        data: {
          name: input.name,
        },
      })
    },
  })
