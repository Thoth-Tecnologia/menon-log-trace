import { TraceFirebaseStrapiRepo } from "@data/usecases/protocols/trace-firebase-strapi-repository";
import { LogReceive } from "@domain/usecases/trace-log";
import { HttpClient } from "@utils/http-client/http-client";
import ApiHelper from "./../../helper/api-helper";

export class TraceFirebaseStrapiRepository implements TraceFirebaseStrapiRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly httpClient: HttpClient;
  private readonly apiHelper: typeof ApiHelper;

  constructor(apiHelper: typeof ApiHelper, httpClient: HttpClient) {
    this.apiHelper = apiHelper;
    this.httpClient = httpClient;
  }

  async saveLog(log: LogReceive): Promise<boolean> {
    try {
      const request = await this.httpClient.post(this.apiHelper.baseUrl, log);

      return request.ok();
    } catch {
      return false;
    }
  }
}
