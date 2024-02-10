import type { FastifyInstance } from 'fastify'

import { products } from '@/routes/products.ts'
import { countries } from '@/routes/countries.ts'
import { supermarkets } from '@/routes/supermarkets.ts'
import { vegetables } from '@/routes/vegetables.ts'

export async function routes (server: FastifyInstance): Promise<FastifyInstance> {
  await server.register(products, { prefix: '/products' })
  await server.register(countries, { prefix: '/countries' })
  await server.register(supermarkets, { prefix: '/supermarkets' })
  await server.register(vegetables, { prefix: '/vegetables' })

  return server
}
