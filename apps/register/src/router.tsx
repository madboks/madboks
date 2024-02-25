import { createBrowserRouter } from 'react-router-dom'

import { Error } from '@/pages/error'
import { Main } from '@/components/layouts/main'

import { loader as registrationLoader } from './pages/registration/loader'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        lazy: async () => await import('./pages/home/index.js')
      },
      {
        path: 'registration',
        id: 'registration',
        lazy: async () => await import('./pages/registration/index.js'),
        loader: registrationLoader,
        children: [
          {
            path: ':supermarketId',
            lazy: async () => await import('./pages/registration.$supermarketId/index.js')
          }
        ]
      }
    ]
  }
])
