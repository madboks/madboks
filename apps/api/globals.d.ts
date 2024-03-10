import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaClient
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string
      PORT: number

      DATABASE_HOST: string
      DATABASE_PORT: string
      DATABASE_DB: string
      DATABASE_USER: string
      DATABASE_PASSWORD: string

      DATABASE_URL: string
    }
  }
}
