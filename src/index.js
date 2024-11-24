import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Styles CSS

// Aucune initialisation Firebase ici, uniquement l'importation si nécessaire
import { db, auth, storage } from './firebaseConfig'; // Facultatif si vous utilisez Firebase dans index.js

// Création du root React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
