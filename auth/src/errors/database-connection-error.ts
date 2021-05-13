import { CustomError } from './custom-error';

export class DatabaseConnectError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor() {
    super('Error connecting to db');

    // Only because we are extending a built-in class 
    Object.setPrototypeOf(this, DatabaseConnectError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      }
    ]
  }
}