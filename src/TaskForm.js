import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function TaskForm({ onTaskAdded }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    try {
      // Ajouter la tâche à Firestore
      const docRef = await addDoc(collection(db, 'tasks'), { name: taskName, completed: false });

      // Notifier le parent (optionnel)
      if (onTaskAdded) {
        onTaskAdded({ id: docRef.id, name: taskName, completed: false });
      }

      // Réinitialiser le champ de saisie
      setTaskName('');
    } catch (error) {
      console.error('Erreur lors de l’ajout de la tâche :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func, // Fonction facultative pour notifier l'ajout
};

export default TaskForm;
