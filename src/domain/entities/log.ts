export interface LogPayload {
  title: string;
  body: string
}

export interface Log {
  operation: string;
  isErr: boolean;
  payload: LogPayload;
  createdAt: Date
}
