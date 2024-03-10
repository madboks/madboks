import { json } from 'react-router-dom'

import type { Supermarkets, Vegetables, Countries } from '@prisma/client'

import { get } from '@/utils/fetch'

export interface LoaderType {
  supermarkets: Supermarkets[]
  vegetables: Vegetables[]
  countries: Countries[]
}

export async function loader () {
  try {
    const [supermarkets, vegetables, countries] = await Promise.all([
      get({ url: 'supermarkets' }),
      get({ url: 'vegetables' }),
      get({ url: 'countries' })
    ])

    return json({
      supermarkets: supermarkets.data,
      vegetables: vegetables.data,
      countries: countries.data
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    throw new Response('Not Found', { status: 404 })
  }
}
