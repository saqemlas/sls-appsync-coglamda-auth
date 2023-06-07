import { gql } from '@apollo/client';

export const createUserMutation = gql`
    mutation CreateUser($user: UserInput) {
    createUser(user: $user) {
      userId
      username
      first
      last
      email
    }
  }
`;

export const getUserQuery = gql`
    query GetUser($userId: String) {
        getUser(userId: $userId) {
          userId
          username
          first
          last
          email
          createdAt
        }
    }
`;
