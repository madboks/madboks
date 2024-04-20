import process from 'node:process'
import type { FastifyInstance } from 'fastify'

const EVENTS = ['SIGINT', 'SIGTERM']

export async function shutdown(server: FastifyInstance): Promise<void> {
  EVENTS.forEach((event) => {
    process.once(event, async (): Promise<NodeJS.Process> => {
      server.log.info('Shutting down server')

      try {
        await server.close()
      }
      catch (error) {
        server.log.error(error)
      }

      return process.exit()
    })
  })
}
