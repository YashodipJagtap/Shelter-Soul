// Import the User model
const { User } = require('../models');
// Import the signToken function from the auth utility
const { signToken } = require('../utils/auth');

module.exports = {
  // Get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      // Find a user by their _id or email
      $or: [{ _id: user ? user._id : params.id }, { email: params.email }],
    });

    // If no user is found, return a 400 status with an error message
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: 'Cannot find a user with this id!' });
    }

    // Return the found user as a JSON response
    res.json(foundUser);
  },
  // Create a user, sign a token, and send it back (to client/src/components/pages/Signup.jsx)
  async createUser({ body }, res) {
    const user = await User.create(body);

    // If user creation fails, return a 400 status with an error message
    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }

    // Sign a token for the new user
    const token = signToken(user);
    // Return the token and user as a JSON response
    res.json({ token, user });
  },
  // Login a user, sign a token, and send it back (to client/src/components/pages/Login.jsx)
  // {body} is destructured req.body
  async login({ body }, res) {
    // Find a user by their email
    const user = await User.findOne({ $or: [{ email: body.email }] });

    // If no user is found, return a 400 status with an error message
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    // Check if the provided password is correct
    const correctPw = await user.isCorrectPassword(body.password);

    // If the password is incorrect, return a 400 status with an error message
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    // Sign a token for the user
    const token = signToken(user);
    // Return the token and user as a JSON response
    res.json({ token, user });
  },
};
