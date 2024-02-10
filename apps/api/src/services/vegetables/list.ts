import { type PrismaClient } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface VegetablesFilters {
  filter?: {
    name?: string
  }
}

export const list = (db: PrismaClient) =>
  async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const { filter } = request.query as VegetablesFilters

    const countries = await db.vegetables.findMany({
      orderBy: {
        name: 'asc'
      },
      where: {
        name: filter?.name != null
          ? {
              equals: filter.name,
              mode: 'insensitive'
            }
          : undefined
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
        data: countries
      })
  }
