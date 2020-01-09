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

const apiAuth = () => {
  return fetchGraphQL(queries.auth);
};

export { apiAuth };
