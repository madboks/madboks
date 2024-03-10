import type { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import { isProduction } from '@/lib/env.ts'

import database from '@/plugins/database.ts'
import shutdown from '@/plugins/shutdown.ts'
import helmetPlugin from '@/plugins/helmet.ts'

export async function plugins (server: FastifyInstance): Promise<void> {
  await server.register(helmetPlugin)

  await server.register(cors, {
    credentials: true,
    maxAge: 1728000,
    methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: isProduction() ? /madboks\.org$/ : '*'
  })

  await server.register(database)
  await server.register(shutdown)
}
