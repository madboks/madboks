import type { FastifyReply, FastifyRequest } from 'fastify'

interface SupermarketsFilters {
  filter?: {
    name?: string
  }
}

export async function list (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  const { filter } = request.query as SupermarketsFilters

  const supermarkets = await request.server.db.supermarkets.findMany({
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
      name: true
    }
  })

  return await response
    .code(200)
    .send({
      error: false,
      data: supermarkets
    })
}
