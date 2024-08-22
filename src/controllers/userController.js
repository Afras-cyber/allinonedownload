const { db, auth } = require('../services/firebaseService'); // Import Firebase services

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await auth.createUser({ email, password });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const download = async (req, res) => {
    const fileId = req.params.id; // Assuming the file ID is passed as a URL parameter
    try {
        // Logic to retrieve the file from the database or storage
        const file = await db.collection('files').doc(fileId).get();
        if (!file.exists) {
            return res.status(404).send('File not found');
        }
        const fileData = file.data();
        res.download(fileData.path); // Send the file to the client
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { signup, download }; // Export the signup and download functions