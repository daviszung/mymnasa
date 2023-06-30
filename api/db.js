const { MongoClient} = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.DB_URI;

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

module.exports = client;