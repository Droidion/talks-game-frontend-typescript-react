class Api {
  readonly headers = {
    "Content-Type": "application/json",
  };
  private url?: string;

  constructor() {
    this.url = process.env.REACT_APP_API_URL;
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

  public async fetchGraphQL(text: string): Promise<any> {
    if (this.url) {
      const response = await fetch(this.url, this.graphRequest(text));
      return await response.json();
    } else {
      return Promise.reject("API URL is undefined");
    }
  }
}

export default Api;
