import jwt from 'jsonwebtoken'

import { ForbiddenAccessError } from '../../errors/forbiddenAccessError'

const { JWT_SECRET, JWT_DURATION = 20 } = process.env

function getTokenDurationFromMinutes(duration) {
  return duration || JWT_DURATION * 60
}

export function createToken(data, duration) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: getTokenDurationFromMinutes(duration) })
}

export function verifyToken({ token, ignoreExpiration = false }) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, { ignoreExpiration }, (error, decoded) => {
      if (error) reject(new ForbiddenAccessError(error.message, error))
      resolve(decoded)
    })
  })
}
