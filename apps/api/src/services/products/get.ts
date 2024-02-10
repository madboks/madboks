import { PrismaClient, Products } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const get = (db: PrismaClient) =>
  async (request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> => {
    const { code } = request.params as { code: Products['barcode'] }

    const product = await db.products.findUnique({
      where: {
        barcode: code,
      },
      select: {
        id: true,
        barcode: true,
        kg: true,
        country: {
          select: {
            code: true,
          }
        },
        vegetable: {
          select: {
            id: true,
          }
        }
      }
    })

    if (product === null) {
      return response
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

    return response
      .code(200)
      .send({
        error: false,
        data: product
      })
  }
