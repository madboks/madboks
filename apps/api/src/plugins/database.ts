import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient()

  await prisma.$connect()

  server
    .decorate('db', prisma)
    .addHook('onClose', async (server) => {
      await server.db.$disconnect()
    })
})

export default prismaPlugin
