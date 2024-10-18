import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClockWithTasks from './AnalogClockWithTasks'
import { TimeProvider } from './TimeContext'

function App() {
 
  return (
    <>
    <TimeProvider>
        <ClockWithTasks />
    </TimeProvider>
    </>
  )
}

export default App
