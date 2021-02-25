export interface GenericLog {
  operation: string;
  isErr: boolean;
  description: string;
  stackTrace?: string;
}
