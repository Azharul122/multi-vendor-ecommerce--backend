import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
  });
};

export default notFound;
