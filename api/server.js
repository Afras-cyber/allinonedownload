const express = require('express');
const userRoutes = require('../src/routes/userRoutes'); // Update the path

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', userRoutes);

// Remove the app.listen() call
// Vercel will handle the serverless function execution

module.exports = app; // Export the app