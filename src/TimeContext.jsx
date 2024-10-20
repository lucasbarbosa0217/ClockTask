import React, { createContext, useState, useEffect } from 'react';
import { useIndexedDBContext } from './useIndexedDb';

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState(new Date());

    const {tasks ,addData} = useIndexedDBContext();

    const hasOverlap = (newTask) => {
        return tasks.some((task) => {
            const newTaskStart = (newTask.startHour * 60) + newTask.startMinute;
            const newTaskEnd = (newTask.endHour * 60) + newTask.endMinute + (newTask.endHour < newTask.startHour ? 1440 : 0); 

            const taskStart = (task.startHour * 60) + task.startMinute;
            const taskEnd = (task.endHour * 60) + task.endMinute + (task.endHour < task.startHour ? 1440 : 0); 
                (newTaskStart < taskEnd && newTaskEnd > taskStart);
        });
    };


    const addTask = (newTask) => {
        newTask.localizacao = 100;

        while (hasOverlap(newTask)) {
            newTask.localizacao += 12.5;
            if (newTask.localizacao >= 90 + (12.5* 4)) {
                return;
            }
        }
        addData(newTask)
    };

  



    useEffect(() => {
        const tick = () => setTime(new Date());

        const delay = 1000 - new Date().getMilliseconds();

        const timerId = setTimeout(function update() {
            tick();
            setInterval(tick, 1000);
        }, delay);

        return () => clearTimeout(timerId);
    }, []);

    return (
        <TimeContext.Provider value={{ time }}>
            {children}
        </TimeContext.Provider>
    );
};

export { TimeContext, TimeProvider };
