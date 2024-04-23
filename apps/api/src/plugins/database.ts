import fp from 'fastify-plugin'
import type { FastifyPluginAsync } from 'fastify'

export const database: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient()

  await prisma.$connect()

  server
    .decorate('db', prisma)
    .addHook('onClose', async (server) => {
      await server.db.$disconnect()
    })
})
