import { type Items, type PrismaClient, type Products } from '@prisma/client'

import { random } from '@/lib/random.ts'

const ITEMS = [
  {
    id: '439048a1-545f-4ab4-8da3-05805cbc4f76',
    volunteer: 'vu@example.com'
  },
  {
    id: '00c84e7f-e6c0-4d63-96e6-55d9faadaa79',
    volunteer: 'moup@example.com'
  },
  {
    id: '41a65e29-ec99-4b66-9221-82e3447a5f52',
    volunteer: 'jol@example.com'
  },
  {
    id: '11173252-b251-4e95-b7d1-ec95d17b363e',
    volunteer: 'cata@example.com'
  },
  {
    id: 'f4af774e-4e5c-4f00-b167-9d63014ae92b',
    volunteer: 'num@example.com'
  },
  {
    id: 'df715357-2ddf-4cee-a55a-b0fd2d057b69',
    volunteer: 'lefob@example.com'
  },
  {
    id: '0f2f5272-6d21-414c-9f3a-4c7ab736285f',
    volunteer: 'wi@example.com'
  },
  {
    id: 'ab7e7464-a535-451b-bf6e-6e7b3aa54264',
    volunteer: 'mi@example.com'
  },
  {
    id: '1ed9cd2e-5a7b-47b6-b898-a70403162834',
    volunteer: 'buf@example.com'
  },
  {
    id: '87fbcb62-ae40-43bc-9986-660ec0f4538b',
    volunteer: 'kukheg@example.com'
  }
]

interface ItemsDataDependencies {
  products: Products[]
}

export async function itemsSeed (
  db: PrismaClient,
  { products }: ItemsDataDependencies
): Promise<Items[]> {
  return await Promise.all(
    ITEMS.map(async pkg => await db.items.create({
      data: {
        productId: (products[random(0, products.length)] as Products).id,
        amount: random(1, 20),
        ...pkg
      }
    }))
  )
}
