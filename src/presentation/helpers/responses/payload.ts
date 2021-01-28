import { PayloadResponse } from "../../controllers/protocols";

export const ok = (): PayloadResponse => ({
  resultCode: 200,
  message: "Action has been succeded",
});

export const badRequest = (message: string): PayloadResponse => ({
  resultCode: 400,
  message,
});
