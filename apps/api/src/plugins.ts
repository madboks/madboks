import process from 'node:process'

import type { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'

import { isProduction } from '@/utils/env.ts'

import { database } from '@/plugins/database.ts'
import { shutdown } from '@/plugins/shutdown.ts'
import { helmet } from '@/plugins/helmet.ts'
import { authorization } from '@//plugins/authorization'

export async function plugins(server: FastifyInstance): Promise<void> {
  await server.register(helmet)

  await server.register(cors, {
    credentials: true,
    maxAge: 1728000,
    methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: isProduction() ? /madboks\.org$/ : true,
  })

  await server.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  })
  await server.register(authorization)

  await server.register(database)
  await server.register(shutdown)
}
