import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UsersProvider } from './UsersProvider'
import { UsersControlProvider } from './UsersControlProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
      <UsersControlProvider>
        <App />
      </UsersControlProvider>
    </UsersProvider>
  </StrictMode>,
)
