import express from 'express';
import cors from 'cors';
import { db } from './firebaseAdminConfig';

const app = express();
const port = 5001;

app.use(cors());

app.use(express.json());

app.post('/add-name', async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Name is required');
    }
  
    try {
      await db.collection('test').add({ name });
      res.status(200).send('Name added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
      res.status(500).send('Error adding name');
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });