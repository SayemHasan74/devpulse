export class AppError extends Error {
  statusCode: number;
  errors: string | string[];

  constructor(statusCode: number, message: string, errors: string | string[] = message) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
