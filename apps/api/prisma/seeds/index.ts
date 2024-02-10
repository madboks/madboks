import { PrismaClient } from '@prisma/client'

import { countriesSeeds } from './countries.ts'
import { supermarketsSeeds } from './supermarkets.ts'
import { vegetablesSeeds } from './vegetables.ts'
import { productsSeed } from './products.ts'
import { itemsSeed } from './items.ts'

import { isDatabaseDebug } from '@/lib/env.ts'

const db = new PrismaClient({
  log: isDatabaseDebug() ? ['query', 'info', 'warn', 'error'] : []
})

async function seeds (): Promise<void> {
  const [countries, supermarkets, vegetables] = await Promise.all([
    countriesSeeds(db),
    supermarketsSeeds(db),
    vegetablesSeeds(db)
  ])

  const products = await productsSeed(db, { countries, supermarkets, vegetables })
  await itemsSeed(db, { products })

  await db.$disconnect()
}

try {
  await seeds()
} catch (error) {
  console.error('Error', error)

  await db.$disconnect()

  process.exit(1)
}
