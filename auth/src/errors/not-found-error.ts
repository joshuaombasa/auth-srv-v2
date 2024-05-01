import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('unknown endpoint');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'unknown endpoint' }];
  }
}

export { NotFoundError };
