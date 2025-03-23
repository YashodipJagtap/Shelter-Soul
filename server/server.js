// Import express
const express = require('express');
// Import ApolloServer from @apollo/server
const { ApolloServer } = require('@apollo/server');
// Import expressMiddleware from @apollo/server/express4
const { expressMiddleware } = require('@apollo/server/express4');
// Import path for handling file paths
const path = require('path');
// Import authMiddleware for authentication
const { authMiddleware } = require('./utils/auth');
// Import cors for handling Cross-Origin Resource Sharing
const cors = require('cors');

// Import typeDefs and resolvers for GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
// Import the database connection
const db = require('./config/connection');
// Import error from console (not used in this code)
const { error } = require('console');

// Define the port for the server
const PORT = process.env.PORT || 3001;
// Create an instance of an express application
const app = express();
// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define an async function to start the Apollo server
const startApolloServer = async () => {
  // Start the Apollo server
  await server.start();

  // Middleware to parse URL-encoded data
  app.use(express.urlencoded({ extended: false }));
  // Middleware to parse JSON data
  app.use(express.json());

  // Middleware to enable CORS
  app.use(cors());
  // Serve up static assets from the images directory
  app.use(
    '/images',
    express.static(path.join(__dirname, '../client/public/images')),
  );

  // Apply Apollo GraphQL middleware with authentication context
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  );

  // If in production environment, serve static files from the client build directory
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // For any other route, send the main index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Once the database is open, start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the Apollo server
startApolloServer();
