import HttpStatus from 'http-status-codes'

export async function resolve(req, res, cb) {
  const data = await cb(req.params)
  if (data && data.length) {
    res.status(HttpStatus.OK).json(data)
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND)
  }
}
