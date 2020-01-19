import { execute, makePromise, DocumentNode, FetchResult } from "apollo-link";
import { HttpLink } from "apollo-link-http";

/** Make fetch request */
const fetchGraphQL = async (
  query: DocumentNode,
  variables: { [name: string]: string }
): Promise<FetchResult> => {
  const uri = process.env.REACT_APP_API_URL;
  const link = new HttpLink({ uri });
  try {
    return await makePromise(
      execute(link, {
        query,
        variables,
      })
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

export default fetchGraphQL;
