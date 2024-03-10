import type { FastifyReply, FastifyRequest } from 'fastify'

interface ProductsFilters {
  filter?: {
    barcode?: string
  }
}

export async function list (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  const { filter } = request.query as ProductsFilters

  const products = await request.server.db.products.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    where: {
      ...filter
    },
    select: {
      id: true,
      barcode: true,
      kg: true,
      country: {
        select: {
          name: true
        }
      }
    }
  })

  return await response
    .code(200)
    .send({
      error: false,
      data: products
    })
}
