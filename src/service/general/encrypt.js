import crypto from 'crypto'

export function encryptText(data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex')
}
