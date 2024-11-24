import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Assurez-vous d'avoir un fichier firebaseConfig.js pour exporter Firestore
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  // Charger les tâches depuis Firebase Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const loadedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(loadedTasks);
    });

    // Nettoyage : désabonnement des listeners Firestore
    return () => unsubscribe();
  }, []);

  // Ajouter une nouvelle tâche
  const addTask = async (task) => {
    try {
      await addDoc(collection(db, 'tasks'), task);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error.message);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error.message);
    }
  };

  return (
    <div>
      <header>
        <h1>Ma Liste de Tâches</h1>
      </header>
      {/* Formulaire pour ajouter des tâches */}
      <TaskForm addTask={addTask} />
      {/* Liste des tâches */}
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
