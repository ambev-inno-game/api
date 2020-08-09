import HttpStatus from 'http-status-codes'

export function errorHandlingMiddleware(err, req, res, next) {
  if (err) {
    const error = {
      message: err.message ? err.message : err,
      stack: err.stack,
      endpoint: `API ERROR: [${req.method}] at '${req.originalUrl}'`,
      statusCode: err.statusCode ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
      originalError: err.originalError,
    }

    console.error(error.endpoint)
    if (error.stack) console.error(error.stack)
    if (error.originalError) console.error(error.originalError)

    const data = err.data ? err.data : {}
    res.status(error.statusCode).json({ ...error, ...data })
  } else {
    next()
  }
}
