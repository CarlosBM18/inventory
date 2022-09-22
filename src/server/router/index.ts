// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { itemsRouter } from './itemsRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('items.', itemsRouter)

// export type definition of API
export type AppRouter = typeof appRouter
