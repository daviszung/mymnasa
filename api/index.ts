import express, { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Database Setup
const uri = process.env.DB_URI!;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();

// Declare users collection
const db = client.db("mymnasa");
const collection = db.collection("users");

// Express boilerplate
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Toggle prod/dev environment
const envi = process.env.ENVI;

// Serve files from public
app.use(express.static(path.join(__dirname, '../public')))

app.get('/api/env', (req: Request, res: Response) => {
  res.json(envi);
});

// Endpoints
app.get('/api/image', async (req: Request, res: Response) => {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
  const data = await response.json();

  res.end(JSON.stringify(data));
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let dynamicResponse;

  try {
    const user = await collection.findOne({ username, password });

    if (user !== null){
      dynamicResponse = "Login Success"
    } else {
      dynamicResponse = "Login Failed"
    }
  }
  catch (err) {
    console.log(err);
  }

  res.json(dynamicResponse)
});

app.post('/api/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let dynamicResponse;

  try {
    const existingUser = await collection.findOne({ username });

    if (existingUser !== null){
      dynamicResponse = "Account Already Exists"
    } else {
      const result = await collection.insertOne({
        username: username,
        password: password,
        dateCreated: new Date()
      });
      dynamicResponse = "Account Created"
    }
  }
  catch (err) {
    console.log(err);
  };
  
  res.json(dynamicResponse);
});

// Catch-all route handler for unknown routes
app.use((req, res) => res.status(404).send('Error: Page not found'));

// Catch-all error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



module.exports = app;