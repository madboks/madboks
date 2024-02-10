import { type Products, type Countries, type PrismaClient, type Supermarkets, type Vegetables } from '@prisma/client'

import { random } from '@/lib/random.ts'

const PRODUCTS = [
  {
    id: '4cbd4ba6-6e11-440c-a3e9-029a5a99ae97',
    barcode: '1111111111111',
    kg: 1
  },
  {
    id: '277b09e8-289c-4cb4-bf04-547429f28851',
    barcode: '0987654321',
    kg: 0.4
  },
  {
    id: '9b77bab5-723e-495a-9578-c2e4405cb3e1',
    barcode: '2222222222222',
    kg: 0.7
  },
  {
    id: '3e374fbc-5e40-44f8-9c3a-fad390a911cd',
    barcode: '1234567890123',
    kg: 1
  },
  {
    id: 'c660db70-d0f0-4cc8-a69c-acadfa42f54e',
    barcode: '019283746556',
    kg: 2
  },
  {
    id: '3b479aa3-b1f8-4afd-a603-275e556005b4',
    barcode: '5745000163052',
    kg: 0.2
  }
]

interface ProductDataDependencies {
  countries: Countries[]
  supermarkets: Supermarkets[]
  vegetables: Vegetables[]
}

export async function productsSeed (
  db: PrismaClient,
  { countries, supermarkets, vegetables }: ProductDataDependencies
): Promise<Products[]> {
  return await Promise.all(
    PRODUCTS.map(async (product, index) => {
      const vegetable = vegetables[random(0, vegetables.length)] as Vegetables
      const country = countries[random(0, countries.length)]

      return await db.products.create({
        data: {
          ...product,
          vegetableId: vegetable.id,
          supermarkets: {
            connect: Array.from({ length: random(1, 4) }, (_, index) => ({ id: supermarkets[index]?.id }))
          },
          countryCode: index !== 0 ? country?.code : undefined
        }
      })
    })
  )
}
