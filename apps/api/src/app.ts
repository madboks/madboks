import { type FastifyInstance } from 'fastify'

import { plugins } from '@/plugins.ts'
import { handlers } from '@/handlers.ts'
import { routes } from '@/routes/index.ts'

export async function app (server: FastifyInstance): Promise<FastifyInstance> {
  // Loading order for fastify
  // https://www.fastify.io/docs/latest/Guides/Getting-Started/#loading-order-of-your-plugins
  await plugins(server)
  await handlers(server)

  await server.register(routes, { prefix: '/api' })

  return server
}
