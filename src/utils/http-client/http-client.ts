/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HttpClientProtocols } from "./http-client-protocols";

export class HttpClient implements HttpClientProtocols {
  private okCodes = [200, 201, 204];
  private latestStatusCode = 0;

  async post(URI: string, data: any): Promise<any> {
    try {
      const request = await axios.post(`${URI}`, data);
      this.latestStatusCode = request.status;
    } catch (e) {
      console.log(e);
      this.latestStatusCode = 500;
    }

    return this;
  }

  ok() {
    return this.okCodes.includes(this.latestStatusCode);
  }
}
