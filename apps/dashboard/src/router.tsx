import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Hi! You are in a route</p>,
    errorElement: <p>THis is an error</p>,
  }
])
