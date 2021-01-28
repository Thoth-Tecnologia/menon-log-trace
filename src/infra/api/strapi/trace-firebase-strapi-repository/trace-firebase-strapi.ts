import { TraceFirebaseStrapiRepo } from "../../../../data/usecases/protocols/trace-firebase-strapi-repository";
import { LogReceive } from "../../../../domain/usecases/trace-log";
import ApiHelper from "./../../helper/api-helper";
import nodeFetch from "node-fetch";

export class TraceFirebaseStrapiRepository implements TraceFirebaseStrapiRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly fetch: any;
  private readonly apiHelper: typeof ApiHelper;

  constructor(fetch: typeof nodeFetch, apiHelper: typeof ApiHelper) {
    this.fetch = fetch;
    this.apiHelper = apiHelper;
  }

  async saveLog(log: LogReceive): Promise<boolean> {
    const request = await this.fetch(this.apiHelper.baseUrl, {
      method: "POST",
      body: log,
    });

    return request.ok();
  }
}
