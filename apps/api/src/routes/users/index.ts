import type { FastifyInstance } from 'fastify'

import * as service from '@/services/users/index.ts'
import { METHOD_GET } from '@/constants/apiMethods'

export function users (server: FastifyInstance): FastifyInstance {
  server.route({
    method: METHOD_GET,
    url: '/me',
    schema: {},
    onRequest: [server.authorize],
    handler: service.me
  })

  return server
}
