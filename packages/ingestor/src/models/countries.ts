import { type PrismaClient } from "@prisma/client"
import { type PrismaClient as PrismaOldClient } from '@internal/prisma-old/client';

export async function getOldCountries (old: PrismaOldClient) {
  return old.country.findMany({
    select: {
      id: true,
      label: true,
    }
  })
}

export async function getCountries (db: PrismaClient) {
  return db.countries.findMany({
    select: {
      code: true,
      name: true,
    }
  })
}
