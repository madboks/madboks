import { type Vegetables } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function get (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  const { name } = request.params as { name: Vegetables['name'] }

  const vegetables = await request.server.db.vegetables.findUnique({
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
