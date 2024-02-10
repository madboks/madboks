import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaOldClient } from '@internal/prisma-old/client';

import { matcher } from './lib/matcher.ts';

import { getCountries, getOldCountries } from './models/countries.ts';
import { getOldSupermarkets, getSupermarkets } from './models/supermarkets.ts';
import { getOldVegetables, getVegetables } from './models/vegetables.ts';

const db = new PrismaClient({
  log: ['query']
})

const old = new PrismaOldClient({
  log: ['query']
})

async function start () {
  const countries = matcher(
    (await getOldCountries(old)).map(i => ({ ...i, id: String(i.id) })),
    (await getCountries(db)).map(i => ({ ...i, id: i.code })),
    {
      key: 'label',
      match: 'name'
    },
    {
      exceptions: {
        'Netherlands/Holland': 'Netherlands',
        'St Kitts and Nevis': 'Saint Kitts and Nevis',
        'St Lucia': 'Saint Lucia',
      },
    }
  )

  const shop = matcher(
    (await getOldSupermarkets(old)).map(i => ({ ...i, id: String(i.id) })),
    await getSupermarkets(db),
    {
      key: 'label',
      match: 'name'
    },
  )

  const vegetables = matcher(
    (await getOldVegetables(old)).map(i => ({ ...i, id: String(i.id) })),
    await getVegetables(db),
    {
      key: 'label',
      match: 'name'
    },
  )

  const data = await old.items.findMany({
    orderBy: {
      scan_time: 'asc'
    },
    take: 10,
    skip: 0
  })
  console.log('[DEBUG] ~ start ~ data:', data)
}

start()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
