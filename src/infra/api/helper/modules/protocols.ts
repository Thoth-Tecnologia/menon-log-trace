import { ApiHelperProtocol } from "@infra/api/helper";

export type ModuleProtocol = Omit<ApiHelperProtocol, "baseUrl" | "setBaseUrl">;
