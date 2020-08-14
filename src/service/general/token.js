import jwt from 'jsonwebtoken'

import { ForbiddenAccessError } from '../../errors/forbiddenAccessError'

const { JWT_SECRET, JWT_DURATION = "20m" } = process.env

export function createToken(data, duration = JWT_DURATION) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: duration })
}

export function verifyToken({ token, ignoreExpiration = false }) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, { ignoreExpiration }, (error, decoded) => {
      if (error) reject(new ForbiddenAccessError(error.message, error))
      resolve(decoded)
    })
  })
}
