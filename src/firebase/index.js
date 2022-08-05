import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {

  apiKey: "AIzaSyBSekRQzi8WjbM9lmxC7NJ3SUwQt3YNY7E",

  authDomain: "todo-list-7ba58.firebaseapp.com",

  projectId: "todo-list-7ba58",

  storageBucket: "todo-list-7ba58.appspot.com",

  messagingSenderId: "500374650092",

  appId: "1:500374650092:web:2cec050fa3695f4f54b9c9"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {
    db
}
