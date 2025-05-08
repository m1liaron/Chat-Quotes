import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChatsProvider } from './contexts/ChatsProvider.tsx'
import { UserProvider } from './contexts/UserProvider.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_API_CLIENT_ID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatsProvider>
      <UserProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </UserProvider>
    </ChatsProvider>
  </StrictMode>,
)
