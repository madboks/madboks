import { type PrismaClient } from "@prisma/client"
import { type PrismaClient as PrismaOldClient } from '@internal/prisma-old/client';

export async function getOldSupermarkets (old: PrismaOldClient) {
  return old.shop.findMany({
    select: {
      id: true,
      label: true,
    }
  })
}

export async function getSupermarkets (db: PrismaClient) {
  return db.supermarkets.findMany({
    select: {
      id: true,
      name: true,
    }
  })
}
