import type { FastifyInstance } from 'fastify'

import * as service from '@/services/supermarkets/index.ts'

export function supermarkets (server: FastifyInstance): FastifyInstance {
  const { db } = server

  server.route({
    method: 'GET',
    url: '/',
    schema: SUPERMARKETS_LIST_SCHEMA,
    handler: service.list(db)
  })

  server.route({
    method: 'GET',
    url: '/:id',
    schema: SUPERMARKETS_GET_SCHEMA,
    handler: service.get(db)
  })

  return server
}

const SUPERMARKET_SCHEMA = {
  additionalProperties: false,
  required: ['id', 'name'],
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  }
}

const SUPERMARKETS_LIST_SCHEMA = {
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
      description: 'List of supermarkets unfiltred or filtred by name',
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
          items: SUPERMARKET_SCHEMA
        }
      }
    }
  }
}

const SUPERMARKETS_GET_SCHEMA = {
  response: {
    200: {
      description: 'Get information about a supermarkets from its id',
      type: 'object',
      required: ['error', 'data'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        },
        data: {
          default: {},
          ...SUPERMARKET_SCHEMA
        }
      }
    }
  }
}
