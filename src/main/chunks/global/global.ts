import ApiHelper from "@infra/api/helper/api-helper";

export const global = {
  setBaseUrl: (url: string): void => ApiHelper.setBaseUrl(url),
};
