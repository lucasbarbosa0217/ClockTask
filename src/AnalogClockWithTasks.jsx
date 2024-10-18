import React, { useState, useEffect } from 'react';

const hourToAngle = (hour, minute) => ((hour % 24) + minute / 60) * 15;

const minuteToAngle = (minute) => (minute / 60) * 360;

const AnalogClockWithTasks = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Ajuste para incluir horas e minutos quebrados nas tarefas
    const tasks = [
        { label: 'Trabalho', startHour: 9, startMinute: 15, endHour: 12, endMinute: 0, color: '#FF5733' },
        { label: 'Estudo', startHour: 14, startMinute: 30, endHour: 16, endMinute: 45, color: '#33FF57' },
        { label: 'Exercício', startHour: 17, startMinute: 0, endHour: 18, endMinute: 15, color: '#3357FF' },
    ];

    // Função para desenhar uma fatia do gráfico (path de SVG para um "arco" circular)
    const drawTaskArc = (startHour, startMinute, endHour, endMinute, radius, color, index) => {
        const startAngle = (startHour + startMinute / 60) / 24 * 360 - 90;
        const endAngle = (endHour + endMinute / 60) / 24 * 360 - 90;

        const startRadians = (startAngle * Math.PI) / 180;
        const endRadians = (endAngle * Math.PI) / 180;

        const startX = 150 + radius * Math.cos(startRadians);
        const startY = 150 + radius * Math.sin(startRadians);
        const endX = 150 + radius * Math.cos(endRadians);
        const endY = 150 + radius * Math.sin(endRadians);

        const largeArcFlag = endHour - startHour <= 12 ? 0 : 1;

        return (
            <path
                key={index}
                d={`M 150 150 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={color}
                opacity="0.1"
                className={`task-arc-${index}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
            />
        );
    };

    const handleHover = (index) => {
        document.querySelector(`.task-arc-${index}`).style.opacity = "0.5";
    };

    const handleLeave = (index) => {
        document.querySelector(`.task-arc-${index}`).style.opacity = "0.1";
    };

    return (
        <div style={{ position: 'relative' }} className="w-screen">
            <svg width="400" height="400" viewBox="0 0 300 300" className='w-full'>
                <circle cx="150" cy="150" r="140" stroke="#D4D4D4" strokeWidth="10" fill="#FAFAFA" stroke-linecap="round" />

                {/* Marcadores de horas */}
                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 - 90) * (Math.PI / 180);
                    const x1 = 150 + 110 * Math.cos(angle);
                    const y1 = 150 + 110 * Math.sin(angle);
                    const x2 = 150 + 112 * Math.cos(angle);
                    const y2 = 150 + 112 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#737373" strokeWidth="0.5" stroke-linecap="round" />;
                })}

                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 - 90) * (Math.PI / 180);
                    const x = 150 + 120 * Math.cos(angle);
                    const y = 150 + 120 * Math.sin(angle);
                    const number = i === 0 ? 24 : i; 

                    return (
                        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#737373" fontSize="10">
                            {number}
                        </text>
                    );
                })} 

                {[...Array(60)].map((_, i) => {
                    const angle = (i * 6 - 90) * (Math.PI / 180);
                    const x1 = 150 + 80 * Math.cos(angle);
                    const y1 = 150 + 80 * Math.sin(angle);
                    const x2 = 150 + 70 * Math.cos(angle);
                    const y2 = 150 + 70 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E5E5E5" strokeWidth="2" stroke-linecap="round" />;
                })}

                {/* Ponteiro das horas */}
                <line
                    x1="150"
                    y1="150"
                    x2={150 + 60 * Math.cos((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))}
                    y2={150 + 60 * Math.sin((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))}
                    stroke="#292524"
                    strokeWidth="4"
                    stroke-linecap="round"
                />

                {/* Ponteiro dos minutos */}
                <line
                    x1="150"
                    y1="150"
                    x2={150 + 90 * Math.cos((minuteToAngle(minutes) - 90) * (Math.PI / 180))}
                    y2={150 + 90 * Math.sin((minuteToAngle(minutes) - 90) * (Math.PI / 180))}
                    stroke="#292524"
                    strokeWidth="3"
                    stroke-linecap="round"
                />

                {/* Ponteiro dos segundos */}
                <line
                    x1="150"
                    y1="150"
                    x2={150 + 100 * Math.cos((minuteToAngle(seconds) - 90) * (Math.PI / 180))}
                    y2={150 + 100 * Math.sin((minuteToAngle(seconds) - 90) * (Math.PI / 180))}
                    stroke="#DC2626"
                    strokeWidth="2"
                    stroke-linecap="round"
                />

                {/* Centro do relógio */}
                <circle cx="150" cy="150" r="5" fill="#292524" />
            </svg>

            <svg
                width="400"
                height="400"
                viewBox="0 0 300 300"
                style={{ position: 'absolute', top: 0, left: 0 }}

                className='w-full'
            >
                {tasks.map((task, index) =>
                    drawTaskArc(task.startHour, task.startMinute, task.endHour, task.endMinute, 135, task.color, index)
                )}
            </svg>

      
        </div>
    );
};

export default AnalogClockWithTasks;
