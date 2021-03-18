import { ApiHelperProtocol } from "@infra/api/helper/api-helper-protocols"
import { ModuleProtocol } from "@infra/api/helper/modules"

export class ApiHelper {
  private static instance: ApiHelper;
  baseUrl: string;

  public static getInstance(): ApiHelper {
    if (!ApiHelper.instance)
      ApiHelper.instance = new ApiHelper();

    return ApiHelper.instance
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
}

export const makeApiHelper = (module: ModuleProtocol): ApiHelperProtocol => ({
  baseUrl: ApiHelper.getInstance().baseUrl,
  setBaseUrl: ApiHelper.getInstance().setBaseUrl,
  ...module
})
