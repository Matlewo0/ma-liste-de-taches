// Importation des modules Firebase nécessaires
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5yJ4EYJkH5v94JQCIEgvib8z_H8lKK78",
  authDomain: "malistedetaches-d23ba.firebaseapp.com",
  projectId: "malistedetaches-d23ba",
  storageBucket: "malistedetaches-d23ba.firebasestorage.app",
  messagingSenderId: "662657166874",
  appId: "1:662657166874:web:876336aa41e9e3db526ba3"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

// Exporter la base de données Firestore
export { db };
