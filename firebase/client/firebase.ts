import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0F8bR9EBhT2qkU6_FIYxVP4CUjwqo6yE',
  authDomain: 'chathub-ac8dd.firebaseapp.com',
  projectId: 'chathub-ac8dd',
  storageBucket: 'chathub-ac8dd.appspot.com',
  messagingSenderId: '402990365845',
  appId: '1:402990365845:web:03bf20ff0bd3e946972f9c',
  measurementId: 'G-HV8F95889Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
