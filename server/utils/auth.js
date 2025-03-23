// Import GraphQLError from graphql
const { GraphQLError } = require('graphql');
// Import jsonwebtoken library
const jwt = require('jsonwebtoken');

// Define the secret key for JWT
const secret = 'mysecretssshhhhhhh';
// Define the token expiration time
const expiration = '2h';

module.exports = {
  // Define a custom authentication error
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // Define the authentication middleware
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is sent in the headers, extract the token value
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is found, return the request object as is
    if (!token) {
      return req;
    }

    // Verify the token and attach the user data to the request object
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // Return the request object
    return req;
  },
  // Define the function to sign a new token
  signToken: function ({ name, email, _id }) {
    // Create the payload with user data
    const payload = { name, email, _id };

    // Sign the token with the secret key and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
