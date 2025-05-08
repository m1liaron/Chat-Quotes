import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChatsProvider } from './contexts/ChatsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatsProvider>
      <App />
    </ChatsProvider>
  </StrictMode>,
)
