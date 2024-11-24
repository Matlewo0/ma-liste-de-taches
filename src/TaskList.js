import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import './TaskList.css';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    // Charger les tâches depuis Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    // Fonction pour mettre à jour le statut d'une tâche
    const toggleTaskCompletion = async (id, currentStatus) => {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, { completed: !currentStatus });
    };

    return (
        <div>
            <h2>À faire</h2>
            <ul>
                {tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id, task.completed)}
                            />
                            {task.name}
                        </li>
                    ))}
            </ul>

            <h2>Terminé</h2>
            <ul>
                {tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id, task.completed)}
                            />
                            {task.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskList;
