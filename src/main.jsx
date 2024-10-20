import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TimeProvider } from './TimeContext.jsx'
import { IndexedDBProvider } from './useIndexedDb.jsx'
import { Toaster } from "sonner"


createRoot(document.getElementById('root')).render(
  <>
      <Toaster richColors position='top-right'></Toaster>
    <IndexedDBProvider dbName="ClockTask" storeName="tasks">

      <TimeProvider>
        <App />

      </TimeProvider>
    </IndexedDBProvider>

  </>


)
