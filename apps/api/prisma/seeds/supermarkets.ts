import { type Supermarkets, type PrismaClient } from '@prisma/client'

const SUPERMARKETS = [
  {
    id: 'dd6c1f63-f252-4ca0-a6b3-020b5c2303bb',
    name: 'Netto'
  },
  {
    id: '2cd1def1-2dbf-4047-82e8-ee2351487698',
    name: 'Rema 1000'
  },
  {
    id: 'ef82a7b0-2ca0-4abc-88cf-f6b22d582773',
    name: 'Hart Bageri'
  },
  {
    id: '229a0d3b-ec26-4865-8c17-b67ae04207b8',
    name: 'SuperBrugsen'
  },
  {
    id: 'a4aa025a-2f49-4915-9e5e-b4750815645d',
    name: 'Lidl'
  },
  {
    id: '043f245a-87fe-4184-bf2b-d156e55fec1f',
    name: 'Aldi'
  },
  {
    id: '8c427937-76d2-42be-8434-29374763d065',
    name: 'Meny'
  },
  {
    id: 'a1712675-e91a-44c8-a713-dd46ac423777',
    name: 'Føtex'
  },
  {
    id: '47153955-7dac-4464-8d4f-3fb29afce7bc',
    name: 'Irma'
  },
  {
    id: 'f0900db2-b897-4b33-a6dc-e0f8f4bc73ec',
    name: 'Meyers Bageri'
  }
]

export async function supermarketsSeeds (db: PrismaClient): Promise<Supermarkets[]> {
  return await Promise.all(
    SUPERMARKETS.map(async supermarket => await db.supermarkets.create({ data: supermarket }))
  )
}
