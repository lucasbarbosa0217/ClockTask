import React, { createContext, useState, useEffect } from 'react';

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState(new Date());

    const [tasks, setTask] = useState(
 [
    { label: 'Leitura', startHour: 9, startMinute: 45, endHour: 11, endMinute: 30, color: '#FF5733' },
    { label: 'Meditação', startHour: 7, startMinute: 20, endHour: 8, endMinute: 0, color: '#FFC300' },
    
    { label: 'Trabalho', startHour: 13, startMinute: 15, endHour: 18, endMinute: 45, color: '#DAF7A6' },
    { label: 'Lazer', startHour: 18, startMinute: 0, endHour: 20, endMinute: 15, color: '#FF33A8' },

    { label: 'Exercício', startHour: 6, startMinute: 30, endHour: 7, endMinute: 15, color: '#900C3F' },
    { label: 'Estudo', startHour: 16, startMinute: 10, endHour: 18, endMinute: 25, color: '#581845' },

    { label: 'Reunião', startHour: 10, startMinute: 5, endHour: 11, endMinute: 50, color: '#C70039' },
    { label: 'Caminhada', startHour: 17, startMinute: 35, endHour: 18, endMinute: 50, color: '#FF5733' },

    { label: 'Planejamento', startHour: 8, startMinute: 50, endHour: 9, endMinute: 30, color: '#FFC300' },

   
]



    
)

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
        <TimeContext.Provider value={{time, tasks, setTask}}>
            {children}
        </TimeContext.Provider>
    );
};

export { TimeContext, TimeProvider };
