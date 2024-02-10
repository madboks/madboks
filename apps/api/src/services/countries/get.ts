import { Countries, type PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const get = (db: PrismaClient) =>
  async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const { code } = request.params as { code: Countries['code'] }

    const country = await db.countries.findUnique({
      where: {
        code
      },
      select: {
        code: true,
        name: true
      }
    })

    return await response
      .code(200)
      .send({
        error: false,
        data: country
      })
  }
