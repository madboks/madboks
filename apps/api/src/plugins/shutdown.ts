import type { FastifyInstance } from 'fastify'

const EVENTS = ['SIGINT', 'SIGTERM']

export async function shutdown (server: FastifyInstance): Promise<void> {
  EVENTS.forEach(event => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once(event, async (): Promise<NodeJS.Process> => {
      server.log.info('Shutting down server')

      try {
        await server.close()
      } catch (error) {
        server.log.error(error)
      }

      return process.exit()
    })
  })
}
