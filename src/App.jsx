import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClockWithTasks from './AnalogClockWithTasks'
import { TimeContext } from './TimeContext'
import TaskList from './TaskList'

function App() {





  return (
    <>
        <ClockWithTasks />
        <TaskList/>
    </>
  )
}

export default App
