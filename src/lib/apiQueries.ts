import gql from "graphql-tag";

/** GraphQL query for user sign in */
const SIGN_IN = gql`
  query AuthQuery($login: String!, $password: String!) {
    signin(login: $login, password: $password) {
      token
      teamNumber
      teamType
      isCommander
      createdAt
      updatedAt
    }
  }
`;

/** GraphQL query for user sign out */
const SIGN_OUT = gql`
  query AuthQuery($token: String!) {
    signout(token: $token) {
      message
    }
  }
`;

export default {
  SIGN_IN,
  SIGN_OUT,
};
