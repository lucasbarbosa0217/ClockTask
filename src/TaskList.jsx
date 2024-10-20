import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useIndexedDBContext } from './useIndexedDb';

const TaskList = () => {
    const { tasks, updateData, deleteData } = useIndexedDBContext();

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
            y: 20,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <ul className='flex flex-col gap-y-3'>
            <AnimatePresence>
                {tasks
                    .sort((a, b) => a.startHour - b.startHour)
                    .map((item, index) => (
                        <motion.li
                            key={item.id}
                            className='flex p-2 bg-neutral-100 gap-2 rounded-lg shadow-md items-center justify-between'
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={index} 
                            layout 
                        >
                            <div className='flex items-center gap-2'>
                                <div className={`w-[0.5rem] h-[2rem] rounded-full`} style={{ backgroundColor: item.color }}></div>
                                {item.label}
                            </div>

                            <div className='flex gap-2'>
                                <button onClick={() => updateData(item)}>Update</button>
                                <button onClick={() => deleteData(item.id)}>Delete</button>
                            </div>
                        </motion.li>
                    ))}
            </AnimatePresence>
        </ul>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    updateData: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,
};

export default TaskList;
