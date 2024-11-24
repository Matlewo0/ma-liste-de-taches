import React, { useState } from 'react';
import { storage } from './firebaseConfig'; // Import du stockage Firebase
import { ref, uploadBytes } from 'firebase/storage';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        try {
            const storageRef = ref(storage, `uploads/${file.name}`);
            await uploadBytes(storageRef, file);
            console.log('Fichier téléversé avec succès');
        } catch (error) {
            console.error('Erreur lors du téléversement :', error.message);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Téléverser</button>
        </div>
    );
};

export default FileUpload;
