import { AUTH_LEVEL } from '../constants/index'
import { validateToken, getTokenFromHeaders } from '../service/general/auth'
import { BadRequestError } from '../errors/badRequestError'

async function auth(req, next, desiredLevel) {
  try {
    const token = getTokenFromHeaders(req.headers)
    await validateToken({ token, desiredLevel })
    next()
  } catch (err) {
    err.message = `Invalid token!: ${err.message}`
    next(err)
  }
}

export async function authAnonymous(req, res, next) {
  const { apiKey } = req.body
  if(!apiKey || !apiKey.length) next(new BadRequestError('Chave de API inválida'))

  next()
}

export async function authLogged(req, res, next) {
  await auth(req, next, [ AUTH_LEVEL.LOGGED ])
}

export async function authSubscription(req, res, next) {
  await auth(req, next, [ AUTH_LEVEL.LOGGED, AUTH_LEVEL.SUBSCRIPTION ])
}
