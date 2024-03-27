import type { FastifyInstance } from 'fastify'

import { healthcheck } from '@/routes/healthcheck/index.ts'

export async function routes (server: FastifyInstance): Promise<FastifyInstance> {
  await server.register(healthcheck, { prefix: '/healthcheck' })

  return server
}
