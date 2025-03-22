// Import the database connection
const db = require('../config/connection');
// Import the Pet and User models
const { Pet, User } = require('../models');
// Import seed data for birds, cats, dogs, hamsters, and rabbits
const birdSeeds = require('./birdData.json');
const catSeeds = require('./catData.json');
const dogSeeds = require('./dogData.json');
const hamsterSeeds = require('./hamsterData.json');
const rabbitSeeds = require('./rabbitData.json');
// Import seed data for users
const userSeeds = require('./userData.json');

// Import the function to clean the database
const cleanDB = require('./cleanDB');

// Once the database connection is open, execute the following asynchronous function
db.once('open', async () => {
  // Implement try-catch for error handling
  try {
    // Clean the Pet collection
    await cleanDB('Pet', 'pets');
    // Clean the User collection
    await cleanDB('User', 'users');

    // Combine all pet seed data and sort by name
    const petSeeds = [
      ...birdSeeds,
      ...catSeeds,
      ...dogSeeds,
      ...hamsterSeeds,
      ...rabbitSeeds,
    ].sort((a, b) => a.name.localeCompare(b.name));

    // Seed the Pet collection with the sorted pet data
    await Pet.create(petSeeds);
    // Seed the User collection with user data
    await User.create(userSeeds);

    // Log success message and exit the process
    console.log('Seeding finished successfully!');
    process.exit(0);
  } catch (err) {
    // Log the error in red color with a font size of 20px
    console.error(`%c${err}, "color: red; font-size: 20px;"`);
    // Log failure message
    console.log('Seeding failed!');
  }
});
