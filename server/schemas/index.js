// Import the type definitions for the GraphQL schema
const typeDefs = require('./typeDefs');
// Import the resolvers for the GraphQL schema
const resolvers = require('./resolvers');

// Export the type definitions and resolvers for use in the GraphQL server setup
module.exports = { typeDefs, resolvers };
