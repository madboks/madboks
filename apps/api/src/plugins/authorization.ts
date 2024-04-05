import fp from 'fastify-plugin'
import type { FastifyRequest, FastifyPluginAsync, FastifyReply } from 'fastify'

import { verifyJWT } from '@/lib/auth'
import { AuthError } from '@/lib/errors'

async function auth (req: FastifyRequest, res: FastifyReply) {
  const { session } = req.cookies

  if (!session) {
    throw new AuthError({ cause: 'INVALID_TOKEN' })
  }

  const cookie = req.unsignCookie(session)

  if (!cookie.valid || !cookie.value) {
    throw new AuthError({ cause: 'INVALID_TOKEN' })
  }

  const payload = verifyJWT(cookie.value)
}

export const authorization: FastifyPluginAsync = fp(async (server) => {
  server.decorate('authorize', auth)
})
