import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIndexedDBContext } from './useIndexedDb';
import EditTaskPopup from './EditTaskPopup';

const TaskList = () => {
    const { tasks, updateData, deleteData } = useIndexedDBContext();
    const [selectedTask, setSelectedTask] = useState(null);

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.3,
            },
        }),
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.1,
            },
        },
    };

    const openEditPopup = (task) => {
        setSelectedTask(task);
    }

    const closeEditPopup = () => {
        setSelectedTask(null);
    }

    return (
        <motion.ul className='flex flex-col gap-y-3 border-[0.5rem] rounded-3xl pb-8 px-4 bg-neutral-100 border-neutral-800 max-h-[30rem] overflow-y-auto'>
            <h1 className='text-3xl py-2 my-4 border-b-[0.125rem] border-neutral-800'>Lista de Tasks</h1>

            <AnimatePresence>
                {tasks.sort((a, b) => a.startHour - b.startHour).map((item, index) => (
                    <motion.li
                        key={item.id}
                        className='flex p-2 px-4 bg-neutral-50 border-[0.125rem] border-neutral-800 rounded-3xl shadow-md items-center justify-between'
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        custom={index}
                        layout
                    >
                        <div className='flex items-center gap-2'>
                            <div className={`w-[0.5rem] h-[2rem] rounded-full`} style={{ backgroundColor: item.color }}></div>
                            <span className='text-lg font-semibold'>{item.label}</span>
                        </div>

                        <div className='flex gap-2'>
                            <button
                                onClick={() => openEditPopup(item)} // Abre o popup de edição
                                className='py-1 px-2 bg-blue-600 text-white font-semibold rounded-2xl border-[0.125rem] border-neutral-800 hover:bg-blue-700'
                            >
                                Atualizar
                            </button>
                            <button
                                onClick={() => deleteData(item.id)}
                                className='py-1 px-2 bg-red-600 text-white font-semibold rounded-2xl border-[0.125rem] border-neutral-800 hover:bg-red-700'
                            >
                                Deletar
                            </button>
                        </div>
                    </motion.li>
                ))}
            </AnimatePresence>

            <AnimatePresence>
                {selectedTask && (
                    <EditTaskPopup
                        task={selectedTask}
                        onClose={closeEditPopup}
                    />
                )}
            </AnimatePresence>
        </motion.ul>
    );
};

export default TaskList;
