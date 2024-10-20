import React, { useContext, useEffect, useState } from 'react';
import { TimeContext } from './TimeContext';

const AddTask = () => {
    const [newTask, setNewTask] = useState({});

    const saveTask = (e) => {
        e.preventDefault();
        addTask(newTask);
    }

    const { addTask } = useContext(TimeContext);

    const update = (e) => {
        if (e.target.name === "startHour") {
            const hour = e.target.value.split(":");
            setNewTask({ ...newTask, startHour: Number(hour[0]), startMinute: Number(hour[1]) });
        } else if (e.target.name === "endHour") {
            const hour = e.target.value.split(":");
            setNewTask({ ...newTask, endHour: Number(hour[0]), endMinute: Number(hour[1]) });
        } else {
            setNewTask({ ...newTask, [e.target.name]: e.target.value });
        }
    }

    return (
        <form onSubmit={saveTask} className="w-full h-fit mx-auto pb-8 px-4 border-[0.5rem] border-neutral-800  bg-neutral-100 rounded-3xl">
            <h1 className='text-3xl py-2  my-4 border-b-[0.125rem] border-neutral-800 '> Criar task</h1>
            <div className="mb-4">
                <label htmlFor='label' className="block text-sm font-medium ">Nome da task:</label>
                <input
                    required
                    type="text"
                    id="label"
                    name="label"
                    onChange={update}
                    className="mt-1 block w-full border-[0.125rem] border-neutral-800 rounded-2xl  p-2 bg-neutral-50"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="startHour" className="block text-sm font-medium ">Hora de começo</label>
                <input
                    required
                    type="time"
                    name="startHour"
                    id="startHour"
                    onChange={update}
                    className="mt-1 block w-full border-[0.125rem] border-neutral-800 rounded-2xl  p-2 bg-neutral-50"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="endHour" className="block text-sm font-medium ">Hora do final</label>
                <input
                    required
                    type="time"
                    name="endHour"
                    id="endHour"
                    onChange={update}
                    className="mt-1 block w-full border-[0.125rem] border-neutral-800 rounded-2xl  p-2 bg-neutral-50"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium ">Cor da task</label>
                <input
                    required
                    type="color"
                    name="color"
                    id="color"
                    onChange={update}
                    className="mt-1 w-full h-10 p-1 border-[0.125rem] border-neutral-800 rounded-2xl  bg-ne"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-2xl  border-[0.125rem] border-neutral-800 hover:bg-blue-700"
            >
                Adicionar Task
            </button>
        </form>
    );
}

export default AddTask;
