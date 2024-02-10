import type { FastifyInstance } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

import { isProduction } from '@/lib/env.ts'

import database from '@/plugins/database.ts'
import shutdown from '@/plugins/shutdown.ts'

export async function plugins (server: FastifyInstance): Promise<void> {
  await server.register(helmet, { contentSecurityPolicy: true })

  await server.register(cors, {
    origin: isProduction() ? /madboks\.com$/ : '*',
    methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    maxAge: 1728000,
    credentials: true
  })

  await server.register(database)
  await server.register(shutdown)
}
