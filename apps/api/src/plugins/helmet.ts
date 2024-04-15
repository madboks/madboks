import fp from 'fastify-plugin'
import { type FastifyPluginAsync } from 'fastify'
import helmetLib from 'helmet'

import { isProduction } from '@/utils/env.ts'

type HelmetErrorHandler = (err?: unknown) => void

export const helmet: FastifyPluginAsync = fp(async (server) => {
  server.addHook('onRequest', (request, reply, next) => {
    return helmetLib({
      contentSecurityPolicy: {
        directives: {},
        reportOnly: !isProduction(),
        useDefaults: true
      },
      frameguard: false,
      referrerPolicy: { policy: 'same-origin' },
      xPoweredBy: false
    })(request.raw, reply.raw, next as HelmetErrorHandler)
  })
})
