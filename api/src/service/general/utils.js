import { randomBytes } from 'crypto'

export const getRandomString = (length = 50) => {
  return randomBytes(length / 2).toString('hex')
}
