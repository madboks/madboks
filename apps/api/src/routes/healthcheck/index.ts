import type { FastifyInstance } from 'fastify'

import { HEALTCHECK_GET_SCHEMA } from '@/routes/healthcheck/get.schema.ts'
import * as service from '@/services/healthcheck/index.ts'

export function healthcheck (server: FastifyInstance): FastifyInstance {
  server.route({
    method: 'GET',
    url: '/',
    schema: HEALTCHECK_GET_SCHEMA,
    handler: service.get
  })

  return server
}
