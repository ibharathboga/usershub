import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsersProvider } from './UsersProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
  </StrictMode>,
)
