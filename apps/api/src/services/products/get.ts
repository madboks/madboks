import { Products } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function get (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  const { code } = request.params as { code: Products['barcode'] }

  const product = await request.server.db.products.findUnique({
    where: {
      barcode: code
    },
    select: {
      id: true,
      barcode: true,
      kg: true,
      country: {
        select: {
          code: true
        }
      },
      vegetable: {
        select: {
          id: true
        }
      }
    }
  })

  if (product === null) {
    return await response
      .code(404)
      .send({
        error: false,
        errors: [{
          code: 'NOT_BARCODE_FOUND',
          status: 404,
          detail: 'Barcode not found'
        }]

      })
  }

  return await response
    .code(200)
    .send({
      error: false,
      data: product
    })
}
