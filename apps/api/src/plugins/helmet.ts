import fp from 'fastify-plugin'
// import helmet from '@fastify/helmet'
import { type FastifyPluginAsync } from 'fastify'
import helmet from 'helmet'

import { isProduction } from '@/lib/env.ts'

type HelmetErrorHandler = (err?: unknown) => void

const helmetPlugin: FastifyPluginAsync = fp(async (server) => {
  server.addHook('onRequest', (request, reply, next) => {
    return helmet({
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

export default helmetPlugin
