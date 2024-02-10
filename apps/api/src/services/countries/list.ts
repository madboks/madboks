import { type PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface CountriesFilters {
  filter?: {
    code?: string
    name?: string
  }
}

export const list = (db: PrismaClient) =>
  async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const { filter } = request.query as CountriesFilters

    const countries = await db.countries.findMany({
      orderBy: {
        name: 'asc'
      },
      where: {
        ...filter
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
        data: countries
      })
  }
