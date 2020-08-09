import HttpStatus from 'http-status-codes'

export class NotFoundError extends Error {
  constructor(message, originalError) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = HttpStatus.NOT_FOUND
    this.originalError = originalError
    Error.captureStackTrace(this, this.constructor)
  }
}
