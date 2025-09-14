import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { DiabetesProvider } from '../context/DiabetesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DiabetesProvider>
        <App />
      </DiabetesProvider>
    </AuthProvider>
  </StrictMode>,
)
