import { Supermarkets, type PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const get = (db: PrismaClient) =>
  async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const { id } = request.params as Supermarkets['id']

    const supermarket = await db.supermarkets.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true
      }
    })

    return await response
      .code(200)
      .send({
        error: false,
        data: supermarket
      })
  }
