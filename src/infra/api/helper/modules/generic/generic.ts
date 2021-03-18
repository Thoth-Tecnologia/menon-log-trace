import { ModuleProtocol } from "@infra/api/helper/modules/protocols"

class GenericModule implements ModuleProtocol {
  private static instance: GenericModule;
  public endpoint: string;

  public static getInstance(): GenericModule {
    if (!GenericModule.instance)
      GenericModule.instance = new GenericModule();

    return GenericModule.instance
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = String(endpoint).length
      ? `/${endpoint}`
      : "";
  }
}

export const genericModule = (): GenericModule => {
  return GenericModule.getInstance();
}
