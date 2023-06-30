"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Serve files from dist
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
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
module.exports = app;
