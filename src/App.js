import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
    return (
        <div>
            <h1>Ma Liste de Tâches</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default App;
