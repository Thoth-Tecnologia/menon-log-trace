import { ModuleProtocol } from "@infra/api/helper/modules/protocols"

class NotificationModule implements ModuleProtocol {
  private static instance: NotificationModule;
  public endpoint: string;

  public static getInstance(): NotificationModule {
    if (!NotificationModule.instance)
      NotificationModule.instance = new NotificationModule();

    return NotificationModule.instance
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = String(endpoint).length
      ? `/${endpoint}`
      : "";
  }
}

export const notificationModule = (): NotificationModule => {
  return NotificationModule.getInstance();
}
