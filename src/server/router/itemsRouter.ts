import { createRouter } from './context'
import { z } from 'zod'
import QRCode from 'qrcode'

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
  .mutation('download-qr-code', {
    input: z.object({
      id: z.string(),
      name: z.string().min(2),
    }),
    async resolve({ input }): Promise<string> {
      return await new Promise((res) => {
        QRCode.toDataURL(input.id, function (err, url) {
          res(url)
        })
      })
    },
  })
