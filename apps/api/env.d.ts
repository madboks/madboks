import { type PrismaClient } from '@prisma/client'
import { type onRequestMetaHookHandler } from 'fastify'
import { type Algorithm } from 'jsonwebtoken'

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient
    authorize?: onRequestMetaHookHandler
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string
      PORT: number

      DATABASE_URL: string

      AUTH_SIGNATURE: string
      AUTH_EXPIRATION: string
      AUTH_ALGORITHM: Algorithm
      AUTH_KID: string
      AUTH_ISSUER: string

      COOKIE_SECRET: string
      COOKIE_DOMAIN: string

      OAUTH_CLIENT_ID: string
      OAUTH_CLIENT_SECRET: string
      OAUTH_REDIRECT_URI: string
    }
  }
}
