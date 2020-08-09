import HttpStatus from 'http-status-codes'

export class ForbiddenAccessError extends Error {
  constructor(message, originalError) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = HttpStatus.FORBIDDEN
    this.originalError = originalError
    Error.captureStackTrace(this, this.constructor)
  }
}
