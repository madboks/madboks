import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from './router'

import './index.css'

const $root = document.getElementById('root')
const Root = createRoot($root!)
Root.render(
    <StrictMode>
      <Router />
    </StrictMode>
  )

if (import.meta.hot) {
  import.meta.hot.dispose(() => Root.unmount())
}
