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
