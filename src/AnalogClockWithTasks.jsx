import React, { useState, useEffect, useContext } from 'react';
import { TimeContext } from './TimeContext';

const hourToAngle = (hour, minute) => ((hour % 24) + minute / 60) * 15;

const minuteToAngle = (minute) => (minute / 60) * 360;

const AnalogClockWithTasks = () => {
 

    const {time, tasks} = useContext(TimeContext);

    const [taskList, setTaskList] = useState(tasks);

    useEffect(() => {
        setTaskList(tasks); 
    }, [tasks]);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();


  const drawTaskArc = (startHour, startMinute, endHour, endMinute, radius, color, index) => {
    let arcs = [];

    let startAngle = (startHour + startMinute / 60) / 24 * 360 - 90;
    let endAngle = (endHour + endMinute / 60) / 24 * 360 - 90;

    let startRadians = (startAngle * Math.PI) / 180;
    let endRadians = (endAngle * Math.PI) / 180;

    let centerX = 150;
    let centerY = 150;

    let adjustedRadius = 138; // Limitar o raio para não ultrapassar o relógio
    let innerRadius = adjustedRadius - 15; // Raio interno para criar o efeito de anel (donut)

    // Coordenadas de início e fim (arco externo)
    let startX = centerX + adjustedRadius * Math.cos(startRadians);
    let startY = centerY + adjustedRadius * Math.sin(startRadians);
    let endX = centerX + adjustedRadius * Math.cos(endRadians);
    let endY = centerY + adjustedRadius * Math.sin(endRadians);

    // Coordenadas de início e fim (arco interno)
    let startInnerX = centerX + innerRadius * Math.cos(startRadians);
    let startInnerY = centerY + innerRadius * Math.sin(startRadians);
    let endInnerX = centerX + innerRadius * Math.cos(endRadians);
    let endInnerY = centerY + innerRadius * Math.sin(endRadians);

    if (endHour < startHour) {
        let firstPartEndAngle = (24 / 24) * 360 - 90; // Fim do dia
        let firstPartEndRadians = (firstPartEndAngle * Math.PI) / 180;
        let firstPartEndX = centerX + adjustedRadius * Math.cos(firstPartEndRadians);
        let firstPartEndY = centerY + adjustedRadius * Math.sin(firstPartEndRadians);
        let firstPartEndInnerX = centerX + innerRadius * Math.cos(firstPartEndRadians);
        let firstPartEndInnerY = centerY + innerRadius * Math.sin(firstPartEndRadians);

        arcs.push(
            <path
                key={`${index}-part1`}
                d={`M ${startX} ${startY} 
                   A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${firstPartEndX} ${firstPartEndY} 
                   L ${firstPartEndInnerX} ${firstPartEndInnerY} 
                   A ${innerRadius} ${innerRadius} 0 0 0 ${startInnerX} ${startInnerY} 
                   Z`}
                fill={color}
                opacity="0.6"
                className={`task-arc-${index}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
            />
        );

        let secondPartStartAngle = (0 / 24) * 360 - 90; // Começo do próximo dia
        let secondPartStartRadians = (secondPartStartAngle * Math.PI) / 180;
        let secondPartStartX = centerX + adjustedRadius * Math.cos(secondPartStartRadians);
        let secondPartStartY = centerY + adjustedRadius * Math.sin(secondPartStartRadians);
        let secondPartStartInnerX = centerX + innerRadius * Math.cos(secondPartStartRadians);
        let secondPartStartInnerY = centerY + innerRadius * Math.sin(secondPartStartRadians);

        arcs.push(
            <path
                key={`${index}-part2`}
                d={`M ${secondPartStartX} ${secondPartStartY} 
                   A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${endX} ${endY} 
                   L ${endInnerX} ${endInnerY} 
                   A ${innerRadius} ${innerRadius} 0 0 0 ${secondPartStartInnerX} ${secondPartStartInnerY} 
                   Z`}
                fill={color}
                opacity="0.6"
                className={`task-arc-${index}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
            />
        );
    } else {
        const largeArcFlag = endHour - startHour <= 12 ? 0 : 1;

        arcs.push(
            <path
                key={index}
                d={`M ${startX} ${startY} 
                   A ${adjustedRadius} ${adjustedRadius} 0 ${largeArcFlag} 1 ${endX} ${endY} 
                   L ${endInnerX} ${endInnerY} 
                   A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY} 
                   Z`}
                fill={color}
                opacity="0.6"
                className={`task-arc-${index}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
            />
        );
    }

    return arcs;
};




    const handleHover = (index) => {
        document.querySelectorAll(`.task-arc-${index}`).forEach(element => element.style.opacity= "1");
    };

    const handleLeave = (index) => {
        document.querySelectorAll(`.task-arc-${index}`).forEach(element => element.style.opacity = "0.6");
    };

    return (
        <div style={{ position: 'relative' }} className="w-screen">
            <svg width="400" height="400" viewBox="0 0 300 300" className='w-full'>
                <circle cx="150" cy="150" r="140" stroke="#292524" strokeWidth="5" fill="#FAFAFA" strokeLinecap="round" />

                {/* Marcadores de horas */}
                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 - 90) * (Math.PI / 180);
                    const x1 = 150 + 75 * Math.cos(angle);
                    const y1 = 150 + 75 * Math.sin(angle);
                    const x2 = 150 + 80 * Math.cos(angle);
                    const y2 = 150 + 80 * Math.sin(angle);

                    if(i %2 !== 0){
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#737373" strokeWidth="0.5" strokeLinecap="round" />;

                    }
                })}

                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x = 150 + 80 * Math.cos(angle);
                    const y = 150 + 80 * Math.sin(angle);
                    const number = i *2 === 0 ? 24 : i*2; 

                    return (
                        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#292524" fontSize="10" fontWeight="bold">
                            {number}
                        </text>
                    );
                })} 

                {[...Array(60)].map((_, i) => {
                    const angle = (i * 6 - 90) * (Math.PI / 180);
                    const x1 = 150 + 100 * Math.cos(angle);
                    const y1 = 150 + 100 * Math.sin(angle);
                    const x2 = 150 + 105 * Math.cos(angle);
                    const y2 = 150 + 105 * Math.sin(angle);
                    if(i %5 != 0){
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#737373" strokeWidth="1" strokeLinecap="round" />;

                    }
                })}

                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x = 150 + 105 * Math.cos(angle);
                    const y = 150 + 105 * Math.sin(angle);
                    const number = i *5;

                    return (
                        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#737373" fontSize="10">
                            {number}
                        </text>
                    );
                })} 

                {/* Ponteiro das horas */}
                <line
                    x1="150"
                    y1="150"
                    x2={150 + 50 * Math.cos((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))}
                    y2={150 + 50 * Math.sin((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))}
                    stroke="#292524"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Ponteiro dos minutos */}
                <line
                    x1="150"
                    y1="150"
                    x2={150 + 70 * Math.cos((minuteToAngle(minutes) - 90) * (Math.PI / 180))}
                    y2={150 + 70 * Math.sin((minuteToAngle(minutes) - 90) * (Math.PI / 180))}
                    stroke="#292524"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Ponteiro dos segundos */}
                <line
                    x1="150"
                    y1="150"
                    x2={150 + 80 * Math.cos((minuteToAngle(seconds) - 90) * (Math.PI / 180))}
                    y2={150 + 80* Math.sin((minuteToAngle(seconds) - 90) * (Math.PI / 180))}
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
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
                {taskList.map((task, index) =>
                    drawTaskArc(task.startHour, task.startMinute, task.endHour, task.endMinute, 135, task.color,  index)
                )}


            </svg>

      
        </div>
    );
};

export default AnalogClockWithTasks;
