const express = require('express');
const authenticate = require('../middleware/authMiddleware'); // Import the authentication middleware
const { signup, download } = require('../controllers/userController'); // Import controller functions
const { db } = require('../services/firebaseService');

const router = express.Router();

router.post('/signup', signup); // Signup route
router.post('/download', authenticate, download); // Download route

router.get('/download-history', authenticate, async (req, res) => { // Updated endpoint to use token
    const userId = req.user.uid; // Get user ID from the token

    try {
        const userDoc = await db.collection('users').doc(userId).get(); // Fetch user document

        if (!userDoc.exists) {
            return res.status(404).send('User not found'); // Standard error message
        }

        const downloadHistory = userDoc.data().downloadHistory; // Get download history

        res.status(200).send(downloadHistory); // Return download history
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/user-details', authenticate, async (req, res) => { // Updated endpoint to use token
    const { uid } = req.user; // Get user ID from the token

    try {
        const userDoc = await db.collection('users').doc(uid).get(); // Fetch user document using uid

        if (!userDoc.exists) {
            return res.status(404).send('User not found'); // Standard error message
        }

        const userDetails = userDoc.data(); // Get user details

        res.status(200).send(userDetails); // Return user details
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Other routes can be added here

module.exports = router; // Export the router