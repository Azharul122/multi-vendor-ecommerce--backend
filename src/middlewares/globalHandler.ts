/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import { TErrorResponse } from '../types/ErrorType'
import errorPreproccesor from '../halpers/errroPreprocessor'
import config from '../app/config'



/* eslint-disable @typescript-eslint/no-explicit-any */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {


  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    status: err.status || 'error',
    message: err.message || 'Something went wrong',
    issues: err.issues || [],
  }


  errorResponse = errorPreproccesor(err)

  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    issues: errorResponse.issues,
    stack: config.node_env === 'development' ? err.stack : undefined,
    error: err,
  })
}

export default globalErrorHandler

