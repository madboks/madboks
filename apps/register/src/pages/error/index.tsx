import React from 'react'
import { useRouteError } from 'react-router-dom'

type RouteError = Error & { status?: number, statusText?: string }
export function Error () {
  const error = useRouteError() as RouteError

  return (
    <div className='container'>
      <h1 className='text-5xl font-bold space-x-2'>Ops! Something happens!</h1>
      <h2 className='text-xl font-bold'>Status: {error.status ?? '500'}</h2>
      <p> {error.statusText ?? error.message}</p>
    </div>
  )
};
