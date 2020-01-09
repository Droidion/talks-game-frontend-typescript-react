const auth = `
query AuthQuery {
  signin(login: "supplier1", password: "supplier1") {
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
