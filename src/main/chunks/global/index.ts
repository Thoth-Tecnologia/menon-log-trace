import { ApiHelper } from "@infra/api/helper/api-helper";

export default {
  setBaseUrl: (url: string): void => ApiHelper.getInstance().setBaseUrl(url),
};
