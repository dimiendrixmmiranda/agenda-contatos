// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwTDULflBQXpsjVtjgn6TQxhMedVxSPsg",
    authDomain: "agenda-contatos-480b9.firebaseapp.com",
    projectId: "agenda-contatos-480b9",
    storageBucket: "agenda-contatos-480b9.appspot.com",
    messagingSenderId: "337621453857",
    appId: "1:337621453857:web:defe516f53e5a49d31a760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };