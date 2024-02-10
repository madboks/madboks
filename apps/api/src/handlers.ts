import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

function manageErrorHandler (error: FastifyError, request: FastifyRequest, response: FastifyReply): FastifyReply {
  request.log.error(error)

  return response
    .status(500)
    .send({
      error: true,
      errors: {
        code: 'GENERIC_ERROR',
        status: 500,
        detail: error.message
      }
    })
}

export function handlers (server: FastifyInstance): FastifyInstance {
  server.setErrorHandler(manageErrorHandler)

  return server
}
