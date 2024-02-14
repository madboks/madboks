import type { FastifyInstance } from 'fastify'

import * as service from '@/services/countries/index.ts'

export function countries (server: FastifyInstance): FastifyInstance {
  server.route({
    method: 'GET',
    url: '/',
    schema: {},
    handler: service.list
  })

  server.route({
    method: 'GET',
    url: '/:code',
    schema: {},
    handler: service.get
  })

  return server
}
