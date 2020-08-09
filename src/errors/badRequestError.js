import HttpStatus from 'http-status-codes'

export class BadRequestError extends Error {
  constructor(message, originalError) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = HttpStatus.BAD_REQUEST
    this.originalError = originalError
    Error.captureStackTrace(this, this.constructor)
  }
}
