// Import the database connection
const db = require('./connection');
// Import the models (currently no models are imported...)
const {} = require('../models');

// When the database connection is open, run the following async function
db.once('open', async () => {
  // Log that the products have been seeded
  console.log('products seeded');

  // Log that the users have been seeded
  console.log('users seeded');

  // Exit the process
  process.exit();
});
