// Import models from the models directory
const models = require('../models');
// Import the database connection
const db = require('../config/connection');

// Export an asynchronous function that takes a model name and a collection name
module.exports = async (modelName, collectionName) => {
  try {
    // Check if the collection exists in the database
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    // If the collection exists, drop the collection
    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    // If an error occurs, throw the error
    throw err;
  }
};
