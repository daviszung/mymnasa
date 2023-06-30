import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;

export const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();