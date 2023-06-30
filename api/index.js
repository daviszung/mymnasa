const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const client = require("./db.js")

dotenv.config();

const app = express();
const port = 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Toggle prod vs dev environment
const envi = process.env.ENVI;
console.log(envi);

app.use(express.static(path.join(__dirname, '../public')))

// Serve files from public
app.use(express.static(path.join(__dirname, '../public')))

app.get('/api/env', (req, res) => {
  console.log("Request for environment variable");

  const stringEnvi = JSON.stringify(envi);
  console.log(stringEnvi);

  res.end(stringEnvi);
});

// Endpoints
app.get('/api/image', async (req, res) => {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
  const data = await response.json()

  res.end(JSON.stringify(data));
});

app.post('/api/login', (req, res) => {
  // Login logic goes here
});

app.post('/api/register', (req, res) => {
  // Registration logic goes here
});

// Catch-all route handler for unknown routes
app.use((req, res) => res.status(404).send('Error: Page not found'));

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;