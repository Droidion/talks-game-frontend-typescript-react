import queries from "./queries";

const headers = {
  "Content-Type": "application/json",
};

const url = process.env.REACT_APP_API_URL;

const graphRequest = (text: string) => {
  return {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: text,
    }),
  };
};

const fetchGraphQL = async (text: string): Promise<any> => {
  if (url) {
    const response = await fetch(url, graphRequest(text));
    return await response.json();
  } else {
    return Promise.reject("API URL is undefined");
  }
};

const apiSignIn = (login: string, password: string) => {
  return fetchGraphQL(queries.signIn(login, password));
};

const apiSignOut = (token: string) => {
  return fetchGraphQL(queries.signOut(token));
};

export { apiSignIn, apiSignOut };
