import type { FastifyInstance } from 'fastify'

import * as service from '@/services/vegetables/index.ts'

export function vegetables (server: FastifyInstance): FastifyInstance {
  server.route({
    method: 'GET',
    url: '/',
    schema: VEGETABLES_LIST_SCHEMA,
    handler: service.list
  })

  server.route({
    method: 'GET',
    url: '/:name',
    schema: VEGETABLES_GET_SCHEMA,
    handler: service.get
  })

  return server
}

const VEGETABLES_SCHEMA = {
  additionalProperties: false,
  required: ['id', 'name'],
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    guideline: { type: 'number' }
  }
}

const VEGETABLES_LIST_SCHEMA = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      filter: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    }
  },
  response: {
    200: {
      description: 'Filter vegetables by name',
      type: 'object',
      required: ['error', 'data'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        },
        data: {
          type: 'array',
          default: [],
          items: VEGETABLES_SCHEMA
        }
      }
    }
  }
}

const VEGETABLES_GET_SCHEMA = {
  response: {
    200: {
      description: 'Get information about a vegatble from its id',
      type: 'object',
      required: ['error', 'data'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        },
        data: {
          default: {},
          ...VEGETABLES_SCHEMA
        }
      }
    }
  }
}
