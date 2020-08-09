import HttpStatus from 'http-status-codes'

export class TemporaryRedirect extends Error {
  constructor(message, data, originalError) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.data = data
    this.statusCode = HttpStatus.MOVED_TEMPORARILY
    this.originalError = originalError
    Error.captureStackTrace(this, this.constructor)
  }
}
