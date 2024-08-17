import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './firebaseAdminConfig';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      createdAt: new Date()
    });

    res.status(200).send('User created successfully');
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).send('Error creating user');
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

  
    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).send('Error logging in');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
