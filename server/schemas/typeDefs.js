// Import gql from apollo-server-express to define the GraphQL schema
const { gql } = require('apollo-server-express');

// Define the GraphQL type definitions
const typeDefs = gql`
  # Define the User type with its fields and their types
  type User {
    _id: ID!
    name: String!
    birthday: String!
    favoritePet: String!
    email: String!
    password: String!
    role: String!
    favorites: [Pet!]
  }

  # Define the Pet type with its fields and their types
  type Pet {
    _id: ID!
    name: String!
    type: String!
    breed: String
    species: String
    gender: String!
    age: Float
    color: String!
    description: String!
    location: String!
    health: String
    tame: Boolean
    specialNeeds: String
    vaccinationHistory: String
    disability: String
    pedigreeKnown: Boolean
    photo: String!
    featured: Boolean
  }

  # Define the Auth type for authentication responses
  type Auth {
    token: ID!
    user: User
  }

  # Define the CheckoutSession type for Stripe checkout sessions
  type CheckoutSession {
    session: ID!
  }

  # Define the PageInfo type for pagination information
  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }

  # Define the PetEdge type for pagination edges
  type PetEdge {
    node: Pet!
    cursor: String!
  }

  # Define the PetConnection type for paginated pet results
  type PetConnection {
    totalCount: Int!
    edges: [PetEdge!]!
    pageInfo: PageInfo!
  }

  # Define the DonateResponse type for donation responses
  type DonateResponse {
    id: String!
  }

  # Define the Query type with its fields and return types
  type Query {
    users: [User]
    user(userId: ID!): User
    allPets: [Pet]
    pets(first: Int, after: String): PetConnection!
    pet(petId: ID!): Pet
    featuredPets: [Pet]
    petTypes: [String]
    locations: [String]
    petsBySearchCriteria(
      location: String
      petType: String
      speciesBreed: String
    ): [Pet]
    breedsOrSpecies(petType: String!): [String]
    me: User
    emailExists(email: String!): Boolean!
  }

  # Define the Mutation type with its fields and return types
  type Mutation {
    addUser(
      name: String!
      birthday: String!
      favoritePet: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addFavorite(petId: ID!): User
    removeFavorite(petId: ID!): User
    donateAmount(amount: String!): DonateResponse!
  }
`;

// Export the type definitions
module.exports = typeDefs;
