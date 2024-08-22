const { verifyIdToken } = require('../services/firebaseService'); // Import the token verification function

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract token from headers
    if (!token) {
        return res.status(401).send('Unauthorized'); // No token provided
    }

    try {
        const decodedToken = await verifyIdToken(token); // Verify token
        req.user = decodedToken; // Attach user info to request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(401).send('Unauthorized'); // Invalid token
    }
};

module.exports = authenticate; // Export the middleware
