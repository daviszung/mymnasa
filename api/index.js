"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const serverless_http_1 = __importDefault(require("serverless-http"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Database Setup
const uri = process.env.DB_URI;
const client = new mongodb_1.MongoClient(uri);
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
;
connectToDatabase();
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Toggle prod vs dev environment
const envi = process.env.ENVI;
console.log(envi);
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Serve files from public
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/api/env', (req, res) => {
    console.log("Request for environment variable");
    res.json(envi);
});
// Endpoints
app.get('/api/image', async (req, res) => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    const data = await response.json();
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
const handler = (0, serverless_http_1.default)(app);
module.exports = handler;
