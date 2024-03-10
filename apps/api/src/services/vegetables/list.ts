import type { FastifyReply, FastifyRequest } from 'fastify'

interface VegetablesFilters {
  filter?: {
    name?: string
  }
}

export async function list (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  const { filter } = request.query as VegetablesFilters

  const countries = await request.server.db.vegetables.findMany({
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
