import { createRouter } from './context'
import { z } from 'zod'

export const itemsRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
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
