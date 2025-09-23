import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UsersProvider } from './UsersProvider.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider >
  </StrictMode>,
)
