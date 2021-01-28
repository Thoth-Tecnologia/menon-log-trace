import { PayloadReceive } from "../../controllers/protocols/controller";

export * from "./../../controllers/protocols/controller";

export interface ValidatePayload {
  setPayload(payload: PayloadReceive): ValidatePayload;
  containsAllRequiredFields(): boolean;
  exibeMissingFields(): Array<string>;
}
