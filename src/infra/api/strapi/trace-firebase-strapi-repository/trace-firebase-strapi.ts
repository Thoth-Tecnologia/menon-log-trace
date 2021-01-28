import { TraceFirebaseStrapiRepo } from "../../../../data/usecases/protocols/trace-firebase-strapi-repository";
import { LogReceive } from "../../../../domain/usecases/trace-log";
import ApiHelper from "./../../helper/api-helper";
import nodeFetch from "node-fetch";

export class TraceFirebaseStrapiRepository implements TraceFirebaseStrapiRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly fetch: any = nodeFetch;
  private readonly apiHelper: typeof ApiHelper;

  constructor(apiHelper: typeof ApiHelper) {
    this.apiHelper = apiHelper;
  }

  async saveLog(log: LogReceive): Promise<boolean> {
    try {
      const request = await this.fetch(this.apiHelper.baseUrl, {
        method: "POST",
        body: log,
      });

      return request.ok;
    } catch {
      return false;
    }
  }
}
