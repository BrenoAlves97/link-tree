import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCqwsq_bJUcYfepk2kAK5OMRAkiiHmwPjE',
  authDomain: 'react-ts-links.firebaseapp.com',
  projectId: 'react-ts-links',
  storageBucket: 'react-ts-links.appspot.com',
  messagingSenderId: '495417980969',
  appId: '1:495417980969:web:033ca613574f8de280c438',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
