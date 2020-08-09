import { AUTH_LEVEL } from '../constants/index'
import { validateToken, getTokenFromHeaders } from '../service/general/auth'

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
  await auth(req, next, AUTH_LEVEL.ANONYMOUS)
}

export async function authLogged(req, res, next) {
  await auth(req, next, AUTH_LEVEL.LOGGED)
}
