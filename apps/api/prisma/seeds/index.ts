import { PrismaClient } from '@prisma/client'

import { isDatabaseDebug } from '@/utils/env.ts'

const db = new PrismaClient({
  log: isDatabaseDebug() ? ['query', 'info', 'warn', 'error'] : []
})

async function seeds (): Promise<void> {
  // Add your seeds here

  await db.$disconnect()
}

try {
  await seeds()
} catch (error) {
  console.error('Error', error)

  await db.$disconnect()

  process.exit(1)
}
