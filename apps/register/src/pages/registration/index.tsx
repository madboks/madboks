import React from 'react'
import { NavLink, Outlet, useLoaderData, useParams } from 'react-router-dom'

import { Subtitle } from '@/components/ui/subtitle'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { type LoaderType as registrationLoaderType } from './loader'

export function Component () {
  const { supermarkets } = useLoaderData() as registrationLoaderType

  const { supermarketId } = useParams()

  return (
    <>
      <div className='flex flex-row justify-between relative'>
        <Subtitle title='Food Registration' />
        {supermarketId &&
          <NavLink to=''>
            <Avatar className='h-12 w-12 shadow-xl border border-gray-200 absolute top-1/2 right-0 transform -translate-y-1/2'>
              <AvatarImage src={`/images/${supermarketId}.jpg`} alt='Supermarket' />
            </Avatar>
          </NavLink>}
      </div>

      {!supermarketId &&
        <div className='grid gap-x-4 gap-y-8 md:gap-y-12 md:grid-cols-2 mt-4'>
          {supermarkets.map(market =>
            <Button asChild variant='outline' key={market.id}>
              <NavLink to={market.id}>
                <Avatar className='h-16 w-16 shadow-xl border border-gray-200'>
                  <AvatarImage src={`/images/${market.id}.jpg`} alt={`Supermarket: ${market.name}`} />
                </Avatar>
                <span className='pl-4 font-medium w-32'>{market.name}</span>
              </NavLink>
            </Button>)}
        </div>}
      <React.Suspense>
        <div className='grow flex flex-col'>
          <Outlet />
        </div>
      </React.Suspense>
    </>
  )
};

Component.displayName = 'Registration'
