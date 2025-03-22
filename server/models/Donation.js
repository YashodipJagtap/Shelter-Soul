// Import the mongoose library
const mongoose = require('mongoose');

// Define a schema for donations
const donationSchema = new mongoose.Schema({
  // Define the donationAmount field with type Number, required, with minimum and maximum length, and trim option
  donationAmount: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  // Define the donationDate field with type Date, default value as current date, and required
  donationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // Define the user field as a reference to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create the Donation model using the donationSchema
const Donation = mongoose.model('Donation', donationSchema);

// Export the Donation model
module.exports = Donation;
