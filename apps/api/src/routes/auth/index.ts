import type { FastifyInstance } from 'fastify'

import { GOOGLE_GET_SCHEMA } from '@/routes/auth/google.schema'

import * as service from '@/services/auth/index.ts'

export function auth (server: FastifyInstance): FastifyInstance {
  server.route({
    method: 'GET',
    url: '/google',
    schema: GOOGLE_GET_SCHEMA,
    handler: service.google
  })

  return server
}
