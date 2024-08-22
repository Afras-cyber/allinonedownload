const admin = require('firebase-admin'); // Import Firebase Admin SDK
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://allinonedownload-4b420.firebaseio.com',
});


const db = admin.firestore();
const auth = admin.auth();

const verifyIdToken = async (token) => {
    return await admin.auth().verifyIdToken(token); // Verify the token
};

module.exports = { db, auth, verifyIdToken }; // Export the services