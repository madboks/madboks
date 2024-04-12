import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { AuthError, GenericError } from '@/utils/errors'

function manageErrorHandler (error: FastifyError, request: FastifyRequest, response: FastifyReply): FastifyReply {
  request.log.error(error)

  if (error instanceof AuthError) {
    return response
      .status(error.code)
      .send({
        error: true,
        errors: {
          code: error.name,
          status: error.code,
          detail: error.cause
        }
      })
  }

  return response
    .status(Number(error.code) ?? GenericError.errorCode)
    .send({
      error: true,
      errors: {
        code: error.name ?? GenericError.errorName,
        status: error.code ?? GenericError.errorCode,
        detail: error.cause ? error.cause : undefined
      }
    })
}

export function handlers (server: FastifyInstance): FastifyInstance {
  server.setErrorHandler(manageErrorHandler)

  return server
}
