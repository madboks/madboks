import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from 'react-router-dom'

import '@fontsource/poppins'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/900.css'
import './index.css'

import { router } from './router'

const root = document.getElementById('root')
ReactDOM
  // @ts-expect-error
  .createRoot(root)
  .render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
