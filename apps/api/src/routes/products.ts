import type { FastifyInstance } from 'fastify'

import * as service from '@/services/products/index.ts'

import errorSchema from '@/lib/errorSchema.ts'

export function products (server: FastifyInstance): FastifyInstance {
  const { db } = server

  server.route({
    method: 'GET',
    url: '/',
    schema: PRODUCTS_LIST_SCHEMA,
    handler: service.list(db)
  })

  server.route({
    method: 'GET',
    url: '/:code',
    schema: PRODUCTS_GET_SCHEMA,
    handler: service.get(db)
  })

  return server
}

const PRODUCTS_SCHEMA = {
  additionalProperties: false,
  required: ['id', 'barcode', 'kg'],
  type: 'object',
  properties: {
    id: { type: 'string' },
    barcode: { type: 'string' },
    kg: { type: 'string' }
  }
}

const PRODUCTS_LIST_SCHEMA = {
  querystring: {
    additionalProperties: false,
    type: 'object',
    properties: {
      filter: {
        additionalProperties: false,
        type: 'object',
        properties: {
          barcode: {
            type: 'string'
          }
        }
      }
    }
  },
  response: {
    200: {
      description: 'Filter products',
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
          items: PRODUCTS_SCHEMA
        }
      }
    }
  }
}

const PRODUCTS_GET_SCHEMA = {
  response: {
    200: {
      description: 'Get information about a product from the barcode',
      type: 'object',
      required: ['error', 'data'],
      properties: {
        error: {
          type: 'boolean',
          default: false
        },
        data: {
          default: [],
          data: {
            default: {},
            ...PRODUCTS_SCHEMA
          }
        }
      }
    },
    400: errorSchema(400),
  }
}
