import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalFont } from './components/globoStyles'

import Home from './pages/home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalFont />
    <Home />
  </StrictMode>,
)
