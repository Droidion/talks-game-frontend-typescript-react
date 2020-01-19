import { request } from "graphql-request";

/** Make fetch request */
const fetchGraphQL = async <T>(
  query: string,
  variables: { [name: string]: string }
): Promise<T> => {
  const uri = process.env.REACT_APP_API_URL ?? "";
  try {
    return await request<T>(uri, query, variables);
  } catch (e) {
    return Promise.reject(e.response?.errors[0].message ?? "Network error");
  }
};

export default fetchGraphQL;
