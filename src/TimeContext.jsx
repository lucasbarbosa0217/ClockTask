import React, { createContext, useState, useEffect } from 'react';

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState(new Date());

    const [tasks, setTask] = useState([
        { label: 'Trabalho', startHour: 20, startMinute: 15, endHour: 11, endMinute: 0, color: '#14B8A6' },
        { label: 'Estudo', startHour: 14, startMinute: 30, endHour: 16, endMinute: 45, color: '#33FF57' },
        { label: 'Exercício', startHour: 11, startMinute: 0, endHour: 12, endMinute: 15, color: '#3357FF' },
        { label: 'Exercício', startHour: 17, startMinute: 0, endHour: 18, endMinute: 47, color: '#3357FF' },

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
