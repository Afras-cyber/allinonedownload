const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', userRoutes); // Use the user routes

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});