import React, { createContext, useState, useEffect } from 'react';
import { useIndexedDBContext } from './useIndexedDb';
import { toast } from "sonner"

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState(new Date());

    const [taskList, setTaskList] = useState(new Date());


    const {tasks ,addData, updateData} = useIndexedDBContext();

    useEffect(() => {
setTaskList(tasks)
    }, [tasks])

    const hasOverlap = (newTask) => {
        
        const newTaskStart = (newTask.startHour * 60) + newTask.startMinute;
        const newTaskEnd = (newTask.endHour * 60) + newTask.endMinute;

        const newTaskMinutes = newTaskStart < newTaskEnd
            ? [[newTaskStart, newTaskEnd]]
            : [[newTaskStart, 1440], [0, newTaskEnd]]; 

        return taskList.some((task) => {
            if(newTask.id  && task.id === newTask.id) {return false}
            const taskStart = (task.startHour * 60) + task.startMinute;
            const taskEnd = (task.endHour * 60) + task.endMinute;

            const taskMinutes = taskStart < taskEnd
                ? [[taskStart, taskEnd]]
                : [[taskStart, 1440], [0, taskEnd]]; 

            const isSameLocation = task.localizacao === newTask.localizacao;

            const overlaps = newTaskMinutes.some(newRange =>
                taskMinutes.some(existingRange =>
                    newRange[0] < existingRange[1] && newRange[1] > existingRange[0]
                )
            );

            return isSameLocation && overlaps;
        });
    };

    const addTask = (newTask) => {
        
        newTask.localizacao = 100;
        while (hasOverlap(newTask)) {
            newTask.localizacao = newTask.localizacao +  12.5;
            if(newTask.localizacao > 137.5){
                toast.error("Não é possível ter mais que 4 tasks simultâneas.")
                return
            }
        }
        toast.success("Task adicionada com sucesso!")

        addData( newTask)
    };

    const updateTask = (newTask) => {

        newTask.localizacao = 100;
        while (hasOverlap(newTask)) {
            newTask.localizacao = newTask.localizacao + 12.5;
            if (newTask.localizacao > 137.5) {
                toast.error("Não é possível ter mais que 4 tasks simultâneas.")
                return
            }
        }
        toast.success("Task adicionada com sucesso!")

        updateData(newTask.id ,newTask)
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
        <TimeContext.Provider value={{ time, addTask, updateTask }}>
            {children}
        </TimeContext.Provider>
    );
};

export { TimeContext, TimeProvider };
