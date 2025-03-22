// Import the mongoose library
const mongoose = require('mongoose');
// Destructure the Schema constructor from mongoose
const { Schema } = mongoose;

// Define a schema for pets
const petSchema = new Schema(
  {
    // Define the name field with type String, required with a custom error message, and trim option
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    // Define the type field with type String, required with a custom error message, and enum for specific values
    type: {
      type: String,
      required: [true, 'Type of pet is required'],
      enum: ['Dog', 'Cat', 'Hamster', 'Bird', 'Rabbit'],
    },
    // Define the species field with type String, optional with a custom message
    species: {
      type: String,
      required: [
        false,
        'Species is optional, but it is recommended to provide it for better search results',
      ],
    },
    // Define the breed field with type String, optional with a custom message
    breed: {
      type: String,
      required: [
        false,
        'Breed is optional, but it is recommended to provide it for better search results',
      ],
    },
    // Define the gender field with type String, optional with a custom message, and enum for specific values
    gender: {
      type: String,
      required: [false, 'Gender is optional, because it is not always known'],
      enum: ['Male', 'Female', 'Other'],
    },
    // Define the age field with type Number, required with a custom message, and minimum value
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age must be a positive number'],
    },
    // Define the colour field with type String, required with a custom message
    color: {
      type: String,
      required: [true, 'Color is required'],
    },
    // Define the description field with type String, required with a custom message
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    // Define the location field with type String, required with a custom message, and enum for specific values
    location: {
      type: String,
      required: [true, 'Location is required'],
      enum: ['Brisbane', 'Melbourne', 'Sydney'],
    },
    // Define the health field with type String, optional with a custom message
    health: {
      type: String,
      required: [false, 'Health status is optional'],
    },
    // Define the tame field with type Boolean, optional with a custom message, and default value
    tame: {
      type: Boolean,
      required: [false, 'Tameness is optional'],
      default: false,
    },
    // Define the specialNeeds field with type String, optional with a custom message
    specialNeeds: {
      type: String,
      required: [false, 'Special needs are optional'],
    },
    // Define the vaccinationHistory field with type String, required with a custom message, and default value
    vaccinationHistory: {
      type: String,
      required: [true, 'Vaccination history is required'],
      default: 'Unknown',
    },
    // Define the disability field with type String and default value
    disability: {
      type: String,
      default: 'None',
    },
    // Define the pedigreeKnown field with type Boolean and default value
    pedigreeKnown: {
      type: Boolean,
      default: false,
    },
    // Define the photo field with type String, required with a custom message
    photo: {
      type: String,
      required: [true, 'Photo URL is required'],
    },

    // owner: {
    //   type: Schema.Types.ObjectId, // References an ObjectId
    //   ref: 'User', // The owner data is stored in a User collection
    //   required: [true, 'Owner is required'],
    // },

    // Define the featured field with type Boolean, optional with a custom message, and default value
    featured: {
      type: Boolean,
      default: false,
      required: [false, 'Featured status is optional'],
    },
  },
  {
    // Enable timestamps to automatically add createdAt and updatedAt fields
    timestamps: true,
  },
);

// Create the Pet model using the petSchema
const Pet = mongoose.model('Pet', petSchema);

// Export the Pet model
module.exports = Pet;
