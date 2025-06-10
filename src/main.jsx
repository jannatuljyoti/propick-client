import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Router from './router/Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
     <RouterProvider router={Router} />
</AuthProvider>
  </StrictMode>,
)
