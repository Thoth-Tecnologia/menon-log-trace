/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpClientProtocols {
  post(URI: string, data: any): Promise<any>;
  ok(): boolean;
}
