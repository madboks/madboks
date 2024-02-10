import Fastify, { type FastifyInstance } from 'fastify'
import { parse } from 'qs'

import { isProduction } from '@/lib/env.ts'
import { UUID } from '@/lib/uuid.ts'
import { app } from '@/app.ts'

async function start (): Promise<FastifyInstance> {
  let transport
  if (!isProduction()) {
    transport = {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        colorize: true
      }
    }
  }

  const server = Fastify({
    ignoreTrailingSlash: false,
    disableRequestLogging: isProduction(),
    genReqId: () => UUID(),
    logger: {
      level: 'info',
      transport
    },
    querystringParser: parse,
    ajv: {
      customOptions: {
        allErrors: false,
        coerceTypes: true,
        removeAdditional: 'all',
        useDefaults: true
      }
    }

  })

  await app(server)

  try {
    await server.listen({
      port: Number(process.env.API_PORT ?? 3000),
      host: process.env.API_HOST ?? '0.0.0.0'
    })
  } catch (error) {
    server.log.error(error)
  }

  return await server
}

start()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
