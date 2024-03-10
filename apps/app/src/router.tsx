import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Hi! You are in an app route</p>,
    errorElement: <p>THis is an app error</p>,
  }
])
