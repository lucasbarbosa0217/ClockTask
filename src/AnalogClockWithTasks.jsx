import React, { useState, useEffect, useContext } from 'react';
import { TimeContext } from './TimeContext';

const hourToAngle = (hour, minute) => ((hour % 24) + minute / 60) * 15;

const minuteToAngle = (minute) => (minute / 60) * 360;

const AnalogClockWithTasks = () => {
 

    const {time, tasks} = useContext(TimeContext);



    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();


  const drawTaskArc = (startHour, startMinute, endHour, endMinute, radius, color, index, localizacao, task) => {
    let arcs = [];



    let startAngle = (startHour + startMinute / 60) / 24 * 360 - 90;
    let endAngle = (endHour + endMinute / 60) / 24 * 360 - 90;

    let startRadians = (startAngle * Math.PI) / 180;
    let endRadians = (endAngle * Math.PI) / 180;

    let centerX = 150;
    let centerY = 150;

    let adjustedRadius = localizacao; 
    let innerRadius = adjustedRadius - 12.5; // Raio interno para criar o efeito de anel

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
          let firstPartEndAngle = 360 - 90; 
          let firstPartEndRadians = (firstPartEndAngle * Math.PI) / 180;
          let firstPartEndX = centerX + adjustedRadius * Math.cos(firstPartEndRadians);
          let firstPartEndY = centerY + adjustedRadius * Math.sin(firstPartEndRadians);
          let firstPartEndInnerX = centerX + innerRadius * Math.cos(firstPartEndRadians);
          let firstPartEndInnerY = centerY + innerRadius * Math.sin(firstPartEndRadians);

          const firstArcLargeArcFlag = (24 - startHour <= 12) ? 0 : 1;

          arcs.push(
              <path
                  key={`${index}-part1`}
                  d={`M ${startX} ${startY} 
               A ${adjustedRadius} ${adjustedRadius} 0 ${firstArcLargeArcFlag} 1 ${firstPartEndX} ${firstPartEndY} 
               L ${firstPartEndInnerX} ${firstPartEndInnerY} 
               A ${innerRadius} ${innerRadius} 0 ${firstArcLargeArcFlag} 0 ${startInnerX} ${startInnerY} 
               Z`}
                  fill={color}
                  opacity="0.6"
                  className={`task-arc-${index}`}
                  onMouseEnter={(e) => handleHover(e,index, task)}
                  onMouseLeave={() => handleLeave(index)}
              />
          );

          let secondPartStartAngle = -90; 
          let secondPartStartRadians = (secondPartStartAngle * Math.PI) / 180;
          let secondPartStartX = centerX + adjustedRadius * Math.cos(secondPartStartRadians);
          let secondPartStartY = centerY + adjustedRadius * Math.sin(secondPartStartRadians);
          let secondPartStartInnerX = centerX + innerRadius * Math.cos(secondPartStartRadians);
          let secondPartStartInnerY = centerY + innerRadius * Math.sin(secondPartStartRadians);

          const secondArcLargeArcFlag = endHour <= 12 ? 0 : 1;

          arcs.push(
              <path
                  key={`${index}-part2`}
                  d={`M ${secondPartStartX} ${secondPartStartY} 
               A ${adjustedRadius} ${adjustedRadius} 0 ${secondArcLargeArcFlag} 1 ${endX} ${endY} 
               L ${endInnerX} ${endInnerY} 
               A ${innerRadius} ${innerRadius} 0 ${secondArcLargeArcFlag} 0 ${secondPartStartInnerX} ${secondPartStartInnerY} 
               Z`}
                  fill={color}
                  opacity="0.6"
                  className={`task-arc-${index}`}
                  onMouseEnter={(e) => handleHover(e,index, task)}
                  onMouseLeave={() => handleLeave(index)}
              />
          );
      } else {
          const largeArcFlag = (endHour - startHour) <= 12 ? 0 : 1;

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
                  onMouseEnter={(e) => handleHover(e,index, task)}
                  onMouseLeave={() => handleLeave(index)}
              />
          );
      }


    return arcs;
};



    const [tooltip, setTooltip] = useState({ visible: false, text: '', position: { x: 0, y: 0 } });

    const handleHover = (e, index, task) => {
        document.querySelectorAll(`.task-arc-${index}`).forEach(element => element.style.opacity= "1");


        const tooltipText = `${task.label} - ${formatTime(task.startHour, task.startMinute)} - ${formatTime(task.endHour, task.endMinute)}`;
        setTooltip({ visible: true, text: tooltipText, position: { x: e.clientX, y: e.clientY } });
    };

    const handleLeave = (index, task) => {
        setTooltip({ ...tooltip, visible: false });

        document.querySelectorAll(`.task-arc-${index}`).forEach(element => element.style.opacity = "0.6");
    };

    const formatTime = (hour, minute) => {
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        return `${formattedHour}:${formattedMinute}`;
    };

    return (
        <div style={{ position: 'relative' }} className="w-screen">
            <svg width="400" height="400" viewBox="0 0 300 300" className='w-full'>
                <circle cx="150" cy="150" r="140" stroke="#292524" strokeWidth="5" fill="#FAFAFA" strokeLinecap="round" />
                <circle cx="150" cy="150" r="85" stroke="#292524" strokeWidth="5" fill="#FAFAFA" strokeLinecap="round" />

                {/* Marcadores de horas */}
                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 - 90) * (Math.PI / 180);
                    const x1 = 150 + 72.5 * Math.cos(angle);
                    const y1 = 150 + 72.5 * Math.sin(angle);
                    const x2 = 150 + 77.5 * Math.cos(angle);
                    const y2 = 150 + 77.5 * Math.sin(angle);

                    if(i %2 !== 0){
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#737373" strokeWidth="0.4" strokeLinecap="round" />;

                    }
                })}


                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 - 90) * (Math.PI / 180);
                    const x1 = 150 + 87.5 * Math.cos(angle);
                    const y1 = 150 + 87.5 * Math.sin(angle);
                    const x2 = 150 + 137.5 * Math.cos(angle);
                    const y2 = 150 + 137.5 * Math.sin(angle);

                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#292524" strokeWidth="0.3" strokeLinecap="round" />;

           
                })}


                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x = 150 + 72.5 * Math.cos(angle);
                    const y = 150 + 72.5* Math.sin(angle);
                    const number = i*2; 

                    return (
                        <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#292524" fontSize="10" fontWeight="bold">
                            {number}
                        </text>
                    );
                })} 

            

            



          
            

            </svg>

            <svg
                width="400"
                height="400"
                viewBox="0 0 300 300"
                style={{ position: 'absolute', top: 0, left: 0 }}

                className='w-full'
            >
                {tasks.map((task, index) =>
                    drawTaskArc(task.startHour, task.startMinute, task.endHour, task.endMinute, 135, task.color,  index, task.localizacao, task)
                )}

                {
                    <line
                        x1={150 + 87.5 * Math.cos((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))}
                        y1={150 + 87.5 * Math.sin((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))} 
                        x2={150 + 137.5 * Math.cos((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))} 
                        y2={150 + 137.5 * Math.sin((hourToAngle(hours, minutes) - 90) * (Math.PI / 180))} 
                        stroke="#292524" 
                        strokeWidth="5" 
                    />
                }

                <text
                    x="150"
                    y="150"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#292524"
                    fontSize="24"
                    fontWeight="bold"
                >
                    {formatTime(hours, minutes)}
                </text>

            </svg>

            {tooltip.visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: tooltip.position.y,
                        left: tooltip.position.x,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        pointerEvents: 'none',
                    }}
                >
                    {tooltip.text}
                </div>
            )}

      
        </div>
    );
};

export default AnalogClockWithTasks;
