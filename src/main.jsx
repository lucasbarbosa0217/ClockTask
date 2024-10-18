import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TimeProvider } from './TimeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimeProvider>
      <App />

    </TimeProvider>
  </StrictMode>,
)
