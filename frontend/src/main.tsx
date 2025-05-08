import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChatsProvider } from './contexts/ChatsProvider.tsx'
import { UserProvider } from './contexts/UserProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ChatsProvider>
  </StrictMode>,
)
