interface LogPayload {
  title: string;
  body: string;
}

export interface NotificationLog {
  operation: string;
  isErr: boolean;
  payload: LogPayload;
}
