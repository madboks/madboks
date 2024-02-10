import { type Vegetables, type PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const get = (db: PrismaClient) =>
  async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const { name } = request.params as { name: Vegetables['name'] }

    const vegetables = await db.vegetables.findUnique({
      where: {
        name
      },
      select: {
        id: true,
        name: true,
        guideline: true
      }
    })

    return await response
      .code(200)
      .send({
        error: false,
        data: vegetables
      })
  }
