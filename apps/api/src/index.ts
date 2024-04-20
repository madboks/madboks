import process from 'node:process'
import Fastify, { type FastifyInstance } from 'fastify'
import { parse } from 'qs'

import { isProduction } from '@/utils/env.ts'
import { uuid } from '@/utils/uuid.ts'

import { app } from '@/app.ts'

interface ServerLogger {
  target: 'pino-pretty'
  options: {
    translateTime: boolean
    colorize: boolean
  }
}

async function runServer(transport?: ServerLogger): Promise<FastifyInstance> {
  const server = Fastify({
    ajv: {
      customOptions: {
        allErrors: false,
        coerceTypes: true,
        removeAdditional: 'all',
        useDefaults: true,
      },
    },
    disableRequestLogging: isProduction(),
    genReqId: () => uuid(),
    ignoreTrailingSlash: false,
    logger: {
      level: 'info',
      transport,
    },
    querystringParser: parse,
    trustProxy: false,
  })

  await app(server)

  await server.ready()

  return await server
}

async function start(): Promise<FastifyInstance> {
  let transport: ServerLogger | undefined
  if (!isProduction()) {
    transport = {
      target: 'pino-pretty',
      options: {
        translateTime: true,
        colorize: true,
      },
    }
  }

  const server = await runServer(transport)

  try {
    await server.listen({
      port: Number(process.env.API_PORT ?? 3000),
      host: process.env.API_HOST ?? '0.0.0.0',
    })
  }
  catch (error) {
    server.log.error(error)
  }

  return server
}

start()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
