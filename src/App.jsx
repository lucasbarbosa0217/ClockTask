import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClockWithTasks from './AnalogClockWithTasks'
import { TimeContext } from './TimeContext'
import TaskList from './TaskList'
import AddTask from './AddTask'

function App() {





  return (
    <>
        <ClockWithTasks />
        <div className='grid grid-cols-1 md:grid-cols-2 w-full container p-4 mx-auto bg-neutral-200 gap-16'>
          <AddTask/>
          <TaskList />

        </div>
    </>
  )
}

export default App
