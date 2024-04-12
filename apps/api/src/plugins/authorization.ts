import fp from 'fastify-plugin'
import type { FastifyRequest, FastifyPluginAsync, FastifyReply } from 'fastify'

import * as jwt from '@/utils/jwt'
import { AuthError } from '@/utils/errors'

async function auth (req: FastifyRequest, res: FastifyReply) {
  const { session } = req.cookies

  if (!session) {
    throw new AuthError({ cause: 'INVALID_TOKEN' })
  }

  const cookie = req.unsignCookie(session)

  if (!cookie.valid || !cookie.value) {
    throw new AuthError({ cause: 'INVALID_TOKEN' })
  }

  const payload = jwt.verify(cookie.value)
  // Check that payload.email and payload.id exists in the database
}

export const authorization: FastifyPluginAsync = fp(async (server) => {
  server.decorate('authorize', auth)
})
