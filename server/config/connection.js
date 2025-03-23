// Import the mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database using the connection string from environment variables or fallback to a local MongoDB instance
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pet_palace_db', // Connect to the database
);

// Export the mongoose connection to be used in other parts of the application
module.exports = mongoose.connection;
