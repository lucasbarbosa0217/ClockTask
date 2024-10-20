import React, { useContext, useEffect, useState } from 'react';
import { TimeContext } from './TimeContext';

const EditTaskPopup = ({ task, onClose }) => {
    const [updatedTask, setUpdatedTask] = useState(task);
    const { updateTask } = useContext(TimeContext);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateTask(updatedTask);
        onClose(); 
    }

    const handleChange = (e) => {
        if (e.target.name === "startHour") {
            const hour = e.target.value.split(":");
            setUpdatedTask({ ...updatedTask, startHour: Number(hour[0]), startMinute: Number(hour[1]) });
        } else if (e.target.name === "endHour") {
            const hour = e.target.value.split(":");
            setUpdatedTask({ ...updatedTask, endHour: Number(hour[0]), endMinute: Number(hour[1]) });
        } else {
            setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
        }
    }

    useEffect(() => {
        setUpdatedTask(task); 
    }, [task]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleUpdate} className="w-full max-w-md bg-white rounded-3xl px-4 pb-8 border-[0.5rem] border-neutral-800">
                <h1 className='text-3xl py-2  my-4 border-b-[0.125rem] border-neutral-800 '> Editar task</h1>
                <div className="mb-4">
                    <label htmlFor='label' className="block text-sm font-medium">Nome da task:</label>
                    <input
                        required
                        type="text"
                        id="label"
                        name="label"
                        value={updatedTask.label}
                        onChange={handleChange}
                        className="mt-1 block w-full border-[0.125rem] border-neutral-800 rounded-2xl p-2 bg-neutral-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startHour" className="block text-sm font-medium">Hora de começo</label>
                    <input
                        required
                        type="time"
                        name="startHour"
                        id="startHour"
                        value={`${String(updatedTask.startHour).padStart(2, '0')}:${String(updatedTask.startMinute).padStart(2, '0')}`}
                        onChange={handleChange}
                        className="mt-1 block w-full border-[0.125rem] border-neutral-800 rounded-2xl p-2 bg-neutral-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endHour" className="block text-sm font-medium">Hora do final</label>
                    <input
                        required
                        type="time"
                        name="endHour"
                        id="endHour"
                        value={`${String(updatedTask.endHour).padStart(2, '0')}:${String(updatedTask.endMinute).padStart(2, '0')}`}
                        onChange={handleChange}
                        className="mt-1 block w-full border-[0.125rem] border-neutral-800 rounded-2xl p-2 bg-neutral-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="color" className="block text-sm font-medium">Cor da task</label>
                    <input
                        required
                        type="color"
                        name="color"
                        id="color"
                        value={updatedTask.color}
                        onChange={handleChange}
                        className="mt-1 w-full h-10 p-1 border-[0.125rem] border-neutral-800 rounded-2xl"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-2xl border-[0.125rem] border-neutral-800 hover:bg-blue-700"
                >
                    Atualizar Task
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 px-4 mt-2 bg-gray-300 text-gray-800 font-semibold rounded-2xl border-[0.125rem] border-neutral-800 hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default EditTaskPopup;
