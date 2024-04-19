import type { FastifyInstance } from 'fastify'

import { HEALTCHECK_GET_SCHEMA } from '@/routes/healthcheck/get.schema.ts'
import * as service from '@/services/healthcheck/index.ts'
import { METHOD_GET } from '@/constants/apiMethods'

export function healthcheck (server: FastifyInstance): FastifyInstance {
  server.route({
    method: METHOD_GET,
    url: '/',
    schema: HEALTCHECK_GET_SCHEMA,
    handler: service.get
  })

  return server
}
