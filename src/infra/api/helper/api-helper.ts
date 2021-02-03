export default {
  baseUrl: "",
  notificationTraceLogEndpoint: "",

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  },
  setNotificationTraceLogEndpoint(endpoint: string): void {
    this.notificationTraceLogEndpoint = String(endpoint).length
      ? `/${endpoint}`
      : "";
  },
};
