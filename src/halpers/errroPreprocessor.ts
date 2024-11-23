/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

import { ZodError } from 'zod'
import { TErrorResponse } from '../types/ErrorType'
import handlerZodError from './handleZodError'
import handleValidationError from './handlerValidationError'
import handlerDuplicateError from './handleDuplicateError'
import handlerCastError from './handlerCastError'
import GenericError from './GenericError'
import handlerGenericError from './handlerGenericError'


const errorPreproccesor = (err: any): TErrorResponse => {
  if (err instanceof ZodError) {
    return handlerZodError(err)
  } else if (err instanceof mongoose.Error.ValidationError) {
    return handleValidationError(err)
  } else if (err.code && err.code === 11000) {
    return handlerDuplicateError(err)
  } else if (err instanceof mongoose.Error.CastError) {
    return handlerCastError(err)
  } else if (err instanceof GenericError) {
    return handlerGenericError(err)
  } else {
    return {
      statusCode: 500,
      status: 'error',
      message: 'Unknown Error',
      issues: [
        {
          path: '',
          message: err.message,
        },
      ],
    }
  }
}

export default errorPreproccesor