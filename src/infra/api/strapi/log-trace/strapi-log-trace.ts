import { ApiLogTraceRepo } from "@data/usecases/protocols/api-log-trace-repository";
import { LogReceive } from "@domain/usecases/notification-trace-log";
import { HttpClient } from "@utils/http-client";
import ApiHelper from "../../helper/api-helper";

export class StrapiLogTraceRepository implements ApiLogTraceRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly httpClient: HttpClient;
  private readonly apiHelper: typeof ApiHelper;

  constructor(apiHelper: typeof ApiHelper, httpClient: HttpClient) {
    this.apiHelper = apiHelper;
    this.httpClient = httpClient;
  }

  async saveLog(log: LogReceive): Promise<boolean> {
    try {
      const request = await this.httpClient.post(
        `${this.apiHelper.baseUrl}${this.apiHelper.notificationTraceLogEndpoint}`,
        log
      );

      return request.ok();
    } catch {
      return false;
    }
  }
}
