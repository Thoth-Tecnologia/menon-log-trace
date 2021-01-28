import { Controller, PayloadReceive, PayloadResponse } from './trace-firebase-protocols'

export class TraceFirebaseController implements Controller {
  handle(payload: PayloadReceive): PayloadResponse {
    console.log(payload)
    return {
      resultCode: 200,
      message: ''
    }
  }
}
