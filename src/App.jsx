import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClockWithTasks from './AnalogClockWithTasks'
import { TimeContext } from './TimeContext'

function App() {
  const { time, tasks, setTask, addTask} = useContext(TimeContext);

  useEffect(() => {

    setTimeout(() => {
      addTask({ label: 'Exercícior', startHour: 11, startMinute: 0, endHour: 10, endMinute: 15, color: '#ff0000' })
   
    }, 10)
  }, [])



  return (
    <>
        <ClockWithTasks />
    </>
  )
}

export default App
