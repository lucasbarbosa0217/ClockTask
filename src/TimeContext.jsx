import React, { createContext, useState, useEffect } from 'react';

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [nextTaskIndex, setNextTaskIndex] = useState(0); // Índice da próxima tarefa a ser adicionada

    const hasOverlap = (newTask) => {
        return tasks.some((task) => {
            const newTaskStart = (newTask.startHour * 60) + newTask.startMinute;
            const newTaskEnd = (newTask.endHour * 60) + newTask.endMinute + (newTask.endHour < newTask.startHour ? 1440 : 0); // Adiciona 1440 minutos se terminar no próximo dia

            const taskStart = (task.startHour * 60) + task.startMinute;
            const taskEnd = (task.endHour * 60) + task.endMinute + (task.endHour < task.startHour ? 1440 : 0); // Adiciona 1440 minutos se terminar no próximo dia

            return task.localizacao === newTask.localizacao &&
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

        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const initialTasks = [
        { label: 'Escrita Criativa', startHour: 20, startMinute: 30, endHour: 22, endMinute: 15, color: '#6A5ACD' },
        { label: 'Yoga', startHour: 21, startMinute: 0, endHour: 21, endMinute: 45, color: '#FFD700' },
        { label: 'Revisão de Projetos', startHour: 15, startMinute: 30, endHour: 17, endMinute: 0, color: '#20B2AA' },
        { label: 'Jardinagem', startHour: 18, startMinute: 15, endHour: 19, endMinute: 30, color: '#FF69B4' },
        { label: 'Corrida Noturna', startHour: 22, startMinute: 0, endHour: 23, endMinute: 0, color: '#8B0000' },
        { label: 'Estudo de Idiomas', startHour: 23, startMinute: 15, endHour: 0, endMinute: 0, color: '#FF4500' },
        { label: 'Brainstorming', startHour: 9, startMinute: 30, endHour: 10, endMinute: 30, color: '#FF8C00' },
        { label: 'Caminhada', startHour: 17, startMinute: 0, endHour: 18, endMinute: 0, color: '#3CB371' },
        { label: 'Planejamento da Semana', startHour: 7, startMinute: 0, endHour: 8, endMinute: 0, color: '#00BFFF' },
        { label: 'Leitura de Romance', startHour: 19, startMinute: 0, endHour: 21, endMinute: 30, color: '#8A2BE2' },
        { label: 'Programação', startHour: 13, startMinute: 0, endHour: 15, endMinute: 0, color: '#D2691E' },
        { label: 'Conferência', startHour: 10, startMinute: 15, endHour: 11, endMinute: 45, color: '#FF6347' },
        { label: 'Treinamento de Habilidades', startHour: 16, startMinute: 30, endHour: 18, endMinute: 0, color: '#2E8B57' },
        { label: 'Aula de Culinária', startHour: 18, startMinute: 45, endHour: 20, endMinute: 15, color: '#FF1493' },
        { label: 'Noite de Jogos', startHour: 20, startMinute: 30, endHour: 23, endMinute: 30, color: '#FF4500' },
        { label: 'Reflexão Diária', startHour: 23, startMinute: 0, endHour: 23, endMinute: 30, color: '#4682B4' },
        { label: 'Desenho Livre', startHour: 0, startMinute: 0, endHour: 1, endMinute: 30, color: '#FF7F50' },
        { label: 'Reunião de Equipe', startHour: 16, startMinute: 15, endHour: 17, endMinute: 15, color: '#FF4500' }, 
        { label: 'Sessão de Filmes', startHour: 18, startMinute: 30, endHour: 21, endMinute: 0, color: '#4682B4' },
        { label: 'Jantar com Amigos', startHour: 19, startMinute: 45, endHour: 22, endMinute: 0, color: '#ADFF2F' }, 
        { label: 'Estudo para Prova', startHour: 22, startMinute: 30, endHour: 23, endMinute: 30, color: '#7B68EE' }, 
        { label: 'Meditação Noturna', startHour: 0, startMinute: 30, endHour: 1, endMinute: 0, color: '#6A5ACD' },
        { label: 'Escrita de Diários', startHour: 1, startMinute: 0, endHour: 2, endMinute: 0, color: '#FFD700' },
        { label: 'Estudo de Música', startHour: 2, startMinute: 0, endHour: 3, endMinute: 30, color: '#20B2AA' },
        { label: 'Desenho Livre', startHour: 3, startMinute: 0, endHour: 4, endMinute: 30, color: '#FF69B4' },
        { label: 'Planejamento do Dia', startHour: 4, startMinute: 0, endHour: 5, endMinute: 0, color: '#8B0000' },
        { label: 'Café da Manhã', startHour: 7, startMinute: 0, endHour: 7, endMinute: 30, color: '#FF4500' },
        { label: 'Exercícios Matinais', startHour: 7, startMinute: 30, endHour: 8, endMinute: 30, color: '#00BFFF' },
        { label: 'Reunião de Planejamento', startHour: 9, startMinute: 0, endHour: 10, endMinute: 0, color: '#D2691E' },
        { label: 'Trabalho Focado', startHour: 10, startMinute: 0, endHour: 12, endMinute: 0, color: '#20B2AA' },
        { label: 'Leitura de Artigos', startHour: 11, startMinute: 0, endHour: 12, endMinute: 0, color: '#FF6347' },
        { label: 'Almoço', startHour: 12, startMinute: 0, endHour: 13, endMinute: 0, color: '#FF8C00' },
        { label: 'Trabalho em Projeto', startHour: 13, startMinute: 30, endHour: 15, endMinute: 30, color: '#3CB371' },
        { label: 'Estudo para Exame', startHour: 15, startMinute: 0, endHour: 17, endMinute: 0, color: '#8A2BE2' },
        { label: 'Reunião de Feedback', startHour: 17, startMinute: 0, endHour: 18, endMinute: 0, color: '#FF69B4' },
        { label: 'Caminhada à Tarde', startHour: 18, startMinute: 0, endHour: 19, endMinute: 0, color: '#2E8B57' },
    ];



    useEffect(() => {
        const addNextTask = () => {
            if (nextTaskIndex < initialTasks.length) {
                const taskToAdd = initialTasks[nextTaskIndex];
                addTask(taskToAdd);
                setNextTaskIndex((prevIndex) => prevIndex + 1);
            }
        };

        addNextTask();
    }, [tasks, nextTaskIndex]);

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
        <TimeContext.Provider value={{ time, tasks }}>
            {children}
        </TimeContext.Provider>
    );
};

export { TimeContext, TimeProvider };
