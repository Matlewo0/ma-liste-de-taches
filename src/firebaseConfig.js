// Importation des modules Firebase nécessaires
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5yJ4EYJkH5v94JQCIEgvib8z_H8lKK78",
  authDomain: "malistedetaches-d23ba.firebaseapp.com",
  projectId: "malistedetaches-d23ba",
  storageBucket: "malistedetaches-d23ba.appspot.com",
  messagingSenderId: "662657166874",
  appId: "1:662657166874:web:876336aa41e9e3db526ba3",
};

// Vérification de l'initialisation de Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialiser les services Firebase
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Exporter les instances pour utilisation dans d'autres fichiers
export { db, auth, storage };
