import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).send({
      errors: error.serializeErrors(),
    });
  }

  response.status(404).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

export { errorHandler };
