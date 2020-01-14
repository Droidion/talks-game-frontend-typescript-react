/** GraphQL query for user sign in */
const signIn = (login: string, password: string) => `
query AuthQuery {
  signin(login: "${login}", password: "${password}") {
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
const signOut = (token: string) => `
query AuthQuery {
  signout(token: "${token}") {
    message
  }        
}
`;

export default {
  signIn,
  signOut,
};
