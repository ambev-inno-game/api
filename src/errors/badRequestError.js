import HttpStatus from 'http-status-codes'

const INVALID_DATA_MESSAGE = 'Dados inválidos.'

export class BadRequestError extends Error {
  constructor(message = INVALID_DATA_MESSAGE, originalError) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = HttpStatus.BAD_REQUEST
    this.originalError = originalError
    Error.captureStackTrace(this, this.constructor)
  }
}
