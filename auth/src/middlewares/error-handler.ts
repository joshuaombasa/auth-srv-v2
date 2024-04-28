import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof RequestValidationError) {
    return response.status(400).send({
      errors: formattedErrors,
    });
  }

  if (error instanceof DatabaseConnectionError) {
    response.status(500).send({
      errors: [{ message: error.reason }],
    });
  }

  response.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

export { errorHandler };
