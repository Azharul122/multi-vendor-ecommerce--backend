import { TErrorIssue, TErrorResponse } from "../types/ErrorType"
import GenericError from "./GenericError"


const handlerGenericError = (err: GenericError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: '',
      message: err.message,
    },
  ]

  return {
    statusCode: err.statusCode,
    status: 'error',
    message: 'Generic Error',
    issues,
  }
}

export default handlerGenericError