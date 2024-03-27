import type { FastifyReply, FastifyRequest } from 'fastify'

export async function get (
  request: FastifyRequest,
  response: FastifyReply
): Promise<FastifyReply> {
  return response
    .code(200)
    .send({
      error: false,
      data: [
        {
          server: true,
          database: true
        }
      ]
    })
}
