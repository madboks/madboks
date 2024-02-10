import type { FastifyInstance } from 'fastify'

import * as service from '@/services/countries/index.ts'

export function countries (server: FastifyInstance): FastifyInstance {
  const { db } = server

  server.route({
    method: 'GET',
    url: '/',
    schema: COUNTRIES_LIST_SCHEMA,
    handler: service.list(db)
  })

  server.route({
    method: 'GET',
    url: '/:code',
    schema: COUNTRIES_GET_SCHEMA,
    handler: service.get(db)
  })

  return server
}

const COUNTRY_SCHEMA = {
  additionalProperties: false,
  required: ['code', 'name'],
  type: 'object',
  properties: {
    code: { type: 'string' },
    name: { type: 'string' }
  }
}

const COUNTRIES_LIST_SCHEMA = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      filter: {
        type: 'object',
        additionalProperties: false,
        properties: {
          code: {
            type: 'string'
          },
          name: {
            type: 'string'
          }
        }
      }
    }
  },
  response: {
    200: {
      description: 'Filter countries by code or name',
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
          items: COUNTRY_SCHEMA
        }
      }
    }
  }
}

const COUNTRIES_GET_SCHEMA = {
  response: {
    200: {
      description: 'Get information about a country from its code',
      type: 'object',
      required: ['error', 'data'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        },
        data: {
          default: {},
          ...COUNTRY_SCHEMA
        }
      }
    }
  }
}
