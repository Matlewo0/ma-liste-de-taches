import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from './firebaseConfig';
import { collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './TaskList.css';

const TaskList = ({ allowDelete = false }) => {
    const [tasks, setTasks] = useState([]);

    // Charger les tâches depuis Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    // Mettre à jour le statut d'une tâche
    const toggleTaskCompletion = async (id, currentStatus) => {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, { completed: !currentStatus });
    };

    // Supprimer une tâche
    const deleteTask = async (id) => {
        const taskDoc = doc(db, 'tasks', id);
        await deleteDoc(taskDoc);
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
                            {allowDelete && (
                                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                            )}
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
                            {allowDelete && (
                                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

// PropTypes pour validation
TaskList.propTypes = {
    allowDelete: PropTypes.bool,
};

export default TaskList;
