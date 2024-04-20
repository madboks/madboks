import type { FastifyReply, FastifyRequest } from 'fastify'

export async function me(
  request: FastifyRequest,
  response: FastifyReply,
): Promise<FastifyReply> {
  return await response
    .code(200)
    .send({
      error: false,
      data: 'Hi user!',
    })
}
