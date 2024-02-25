import type { FastifyInstance } from 'fastify'

import * as service from '@/services/auth/index.ts'

export function auth (server: FastifyInstance): FastifyInstance {
  server.route({
    method: 'GET',
    url: '/',
    handler: service.auth
  })

  return server
}
