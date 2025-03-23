import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $birthday: String!
    $favoritePet: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      name: $name
      birthday: $birthday
      favoritePet: $favoritePet
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        name
        birthday
        favoritePet
        email
      }
    }
  }
`;

export const DONATE_AMOUNT = gql`
  mutation donateAmount($amount: String!) {
    donateAmount(amount: $amount) {
      id
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($petId: ID!) {
    addFavorite(petId: $petId) {
      _id
      name
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($petId: ID!) {
    removeFavorite(petId: $petId) {
      _id
      name
    }
  }
`;
