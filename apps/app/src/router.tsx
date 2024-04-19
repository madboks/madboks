import { createElement } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './pages/dahsboard'
import * as Root from '@/pages/root'
import * as Login from '@/pages/login'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '',
    Component: Root.Component,
    loader: Root.loader,
    children: [
      {
        path: '/',
        Component: Dashboard,
        children: [
          {
            path: 'home',
            element: 'home',
          },
          {
            path: 'settings',
            element: 'settings',
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    Component: Login.Component,
    action: Login.action,
    loader: Login.loader,
  },
])

export function Router() {
  return createElement(
    RouterProvider,
    { router },
  )
}

// HMR: clean up on module reload
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot)
  import.meta.hot.dispose(() => router.dispose())
