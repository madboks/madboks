import { createBrowserRouter } from 'react-router-dom'

import { Error } from '@/pages/error'
import { Main } from '@/components/layouts/main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: 'Hi! Welcome to the registration page!',
      },
    ]
  }
])
