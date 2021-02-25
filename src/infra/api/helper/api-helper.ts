export default {
  baseUrl: "",
  endpoint: "",

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  },
  setEndpoint(endpoint: string): void {
    this.endpoint = String(endpoint).length
      ? `/${endpoint}`
      : "";
  }
};
