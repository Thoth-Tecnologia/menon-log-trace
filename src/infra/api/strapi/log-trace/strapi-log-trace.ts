import { ApiLogTraceRepo } from "@data/usecases/protocols/api-log-trace-repository";
import { LogReceive } from "@domain/usecases/notification-trace-log";
import { HttpClient } from "@utils/http-client";
import { ApiHelperProtocol } from "../../helper";

export class StrapiLogTraceRepository implements ApiLogTraceRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly httpClient: HttpClient;
  private readonly apiHelper: ApiHelperProtocol;

  constructor(apiHelper: ApiHelperProtocol, httpClient: HttpClient) {
    this.apiHelper = apiHelper;
    this.httpClient = httpClient;
  }

  async saveLog(log: LogReceive): Promise<boolean> {
    try {
      const request = await this.httpClient.post(
        `${this.apiHelper.baseUrl}${this.apiHelper.endpoint}`,
        log
      );

      return request.ok();
    } catch {
      return false;
    }
  }
}
