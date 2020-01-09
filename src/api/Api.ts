import queries from "./queries";

class Api {
  readonly headers = {
    "Content-Type": "application/json",
  };
  private url?: string;
  private queries: { [key: string]: string };

  constructor() {
    this.url = process.env.REACT_APP_API_URL;
    this.queries = queries;
  }

  private graphRequest(text: string) {
    return {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        query: text,
      }),
    };
  }

  private async fetchGraphQL(text: string): Promise<any> {
    if (this.url) {
      const response = await fetch(this.url, this.graphRequest(text));
      return await response.json();
    } else {
      return Promise.reject("API URL is undefined");
    }
  }

  public apiAuth() {
    return this.fetchGraphQL(this.queries.auth);
  }
}

export default Api;
