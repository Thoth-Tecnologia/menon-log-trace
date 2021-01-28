// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PayloadReceive = any;

export interface PayloadResponse {
  resultCode: number;
  message: string;
}

export interface Controller {
  handle(payload: PayloadReceive): Promise<PayloadResponse>;
}
