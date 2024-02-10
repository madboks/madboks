import { type PrismaClient } from "@prisma/client"
import { type PrismaClient as PrismaOldClient } from '@internal/prisma-old/client';

export async function getOldVegetables (old: PrismaOldClient) {
  return old.products.findMany({
    select: {
      id: true,
      label: true,
    }
  })
}

export async function getVegetables (db: PrismaClient) {
  return db.vegetables.findMany({
    select: {
      id: true,
      name: true,
    }
  })
}
