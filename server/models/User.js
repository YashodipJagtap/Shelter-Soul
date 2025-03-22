// Import Schema and model constructors from mongoose
const { Schema, model } = require('mongoose');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Define a schema for users
const userSchema = new Schema({
  // Define the name field with type String and required
  name: {
    type: String,
    required: true,
  },
  // Define the birthday field with type Date, required, and a regex match for format validation
  birthday: {
    type: Date,
    required: true,
    match: [/\d{4}-\d{2}-\d{2}/, 'Birthday must be in YYYY-MM-DD format'],
  },
  // Define the favouritePet field with type String and required
  favoritePet: {
    type: String,
    required: true,
  },
  // Define the email field with type String, required, unique, and a regex match for format validation
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  // Define the password field with type String, required, and a minimum length
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  // role: {
  //   type: String,
  //   required: true,
  //   enum: ['admin', 'user'],
  //   default: 'user',
  // },

  // Define the favorites field as an array of ObjectId references to the Pet model
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
});

// Hash user password before saving to the database
userSchema.pre('save', async function (next) {
  // If the password field is new or modified, hash the password
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Call the next middleware
  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  // Compare the provided password with the hashed password in the database
  return bcrypt.compare(password, this.password);
};

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
