// Import models
const { User, Pet, Donation } = require('../models');
// Import authentication utilities
const { signToken, AuthenticationError } = require('../utils/auth');
// Import ObjectId from mongodb
const { ObjectId } = require('mongodb');
// Load environment variables
require('dotenv').config();
// Initialise Stripe with the secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    // Query to get all users
    users: async () => {
      return User.find();
    },
    // Query to get a single user by their userId
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('favorites');
    },
    // Query to get the currently authenticated user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // Query to get a paginated list of pets
    pets: async (parent, { first, after }) => {
      const results = await Pet.find(
        after ? { _id: { $gt: new ObjectId(after) } } : {},
      )
        .sort({ _id: 1 }) // Sort by _id in ascending order
        .limit(first + 1); // Fetch one extra pet to check if there is a next page

      const edges = results.slice(0, first).map((pet) => ({
        node: pet,
        cursor: pet._id,
      }));

      const totalCount = await Pet.countDocuments();

      const pageInfo = {
        hasNextPage: results.length > first, // There is a next page if more than `first` pets were fetched
        endCursor: edges.length ? edges[edges.length - 1].cursor : null,
      };

      return { totalCount, edges, pageInfo };
    },

    // Query to get all pets
    allPets: async () => {
      return Pet.find({});
    },

    // Query to get a single pet by their petId
    pet: async (parent, { petId }) => {
      return await Pet.findOne({ _id: petId });
    },

    // Query to get all featured pets
    featuredPets: async () => {
      return await Pet.find({ featured: true });
    },
    // Query to get distinct pet types
    petTypes: async () => {
      return await Pet.find().distinct('type');
    },
    // Query to get distinct locations
    locations: async () => {
      return await Pet.find().distinct('location');
    },
    // Query to get breeds or species based on pet type
    breedsOrSpecies: async (parent, { petType }) => {
      const breeds = await Pet.find({ type: petType }).distinct('breed');
      const species = await Pet.find({ type: petType }).distinct('species');
      const header = breeds.length > 0 ? 'All Breeds' : 'All Species';
      return [header, ...breeds, ...species];
    },
    // Query to get pets by search criteria
    petsBySearchCriteria: async (
      parent,
      { location, petType, speciesBreed },
    ) => {
      let results = [];
      if (location === 'All Locations' && petType === 'All Pet Types') {
        results = await Pet.find();
      } else if (location === 'All Locations') {
        if (speciesBreed === 'All Breeds' || speciesBreed === 'All Species') {
          results = await Pet.find({ type: petType });
        } else {
          results = await Pet.find({
            type: petType,
            $or: [{ species: speciesBreed }, { breed: speciesBreed }],
          });
        }
      } else if (petType === 'All Pet Types') {
        results = await Pet.find({ location: location });
      } else {
        if (speciesBreed === 'All Breeds' || speciesBreed === 'All Species') {
          results = await Pet.find({ location: location, type: petType });
        } else {
          results = await Pet.find({
            location: location,
            type: petType,
            $or: [{ species: speciesBreed }, { breed: speciesBreed }],
          });
        }
      }
      return results;
    },
    // Query to check if an email exists
    emailExists: async (_, { email }) => {
      const user = await User.findOne({ email });
      return !!user;
    },
  },

  Mutation: {
    // Mutation to login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Mutation to add a new user
    addUser: async (
      parent,
      { name, birthday, favoritePet, email, password },
    ) => {
      const user = await User.create({
        name: name,
        birthday: birthday,
        favoritePet: favoritePet,
        email: email,
        password: password,
      });

      const token = signToken(user);
      return { token, user };
    },

    // Mutation to add a pet to the user's favourites
    addFavorite: async (parent, { petId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated.');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { favorites: petId } },
          { new: true },
        );

        return updatedUser;
      } catch (error) {
        console.error('Error adding favorite:', error);
        throw new Error('Error adding favorite.');
      }
    },

    // Mutation to remove a pet from the user's favourites
    removeFavorite: async (parent, { petId }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      try {
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error('User not found');
        }

        user.favorites = user.favorites.filter(
          (favorite) => favorite.toString() !== petId,
        );
        await user.save();

        return user;
      } catch (error) {
        console.error('Error removing favorite:', error);
        throw new Error('Failed to remove favorite');
      }
    },

    // Mutation to handle donation amount using Stripe
    donateAmount: async (parent, { amount }, context) => {
      try {
        const lineItems = [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'Donation Amount',
              },
              unit_amount: Math.ceil(amount * 100),
            },
            quantity: 1,
          },
        ];
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: `${context.headers.origin}/success`,
          cancel_url: `${context.headers.origin}/`,
        });
        return {
          id: session.id,
        };
      } catch (error) {
        console.log(error);
        throw new Error('Error during donating amount');
      }
    },
  },
};

// Export the resolvers
module.exports = resolvers;
