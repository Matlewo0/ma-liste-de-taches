import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const TaskForm = () => {
    const [taskName, setTaskName] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (!taskName) return;
        await addDoc(collection(db, 'tasks'), { name: taskName, completed: false });
        setTaskName('');
    };

    return (
        <form onSubmit={addTask}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Nouvelle tâche"
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default TaskForm;
