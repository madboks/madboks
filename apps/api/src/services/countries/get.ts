import { Countries } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function get (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  const { code } = request.params as { code: Countries['code'] }

  const country = await request.server.db.countries.findUnique({
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
