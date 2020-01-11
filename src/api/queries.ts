const auth = (login: string, password: string) => `
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

export default {
  auth,
};
