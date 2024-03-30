import type { FastifyInstance } from 'fastify'

import * as service from '@/services/users/index.ts'

export function users (server: FastifyInstance): FastifyInstance {
  server.route({
    method: 'GET',
    url: '/me',
    schema: {},
    onRequest: [server.authorize],
    handler: service.me
  })

  return server
}
