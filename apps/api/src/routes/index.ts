import type { FastifyInstance } from 'fastify'

import { healthcheck } from '@/routes/healthcheck/index.ts'
import { auth } from '@/routes/auth/index.ts'
import { users } from '@/routes/users/index.ts'

export async function routes(server: FastifyInstance): Promise<FastifyInstance> {
  await server.register(healthcheck, { prefix: '/healthcheck' })
  await server.register(auth, { prefix: '/auth' })
  await server.register(users, { prefix: '/users' })

  return server
}
