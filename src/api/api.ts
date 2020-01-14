import queries from "./queries";

/** HTTP Request headers */
const headers = {
  "Content-Type": "application/json",
};

const url = process.env.REACT_APP_API_URL;

/** Request object for fetch */
const graphRequest = (text: string) => {
  return {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: text,
    }),
  };
};

/** Make fetch request */
const fetchGraphQL = async (text: string): Promise<any> => {
  if (url) {
    const response = await fetch(url, graphRequest(text));
    return await response.json();
  } else {
    return Promise.reject("API URL is undefined");
  }
};

/** Make user sign in request */
const apiSignIn = (login: string, password: string) => {
  return fetchGraphQL(queries.signIn(login, password));
};

/** Make user sign out request */
const apiSignOut = (token: string) => {
  return fetchGraphQL(queries.signOut(token));
};

export { apiSignIn, apiSignOut };
