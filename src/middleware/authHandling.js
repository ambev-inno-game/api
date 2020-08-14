import { AUTH_LEVEL } from '../constants/index'
import { validateAuth, getTokenFromHeaders, validateApiKey } from '../service/general/auth'

async function auth(req, next, desiredLevels) {
  try {
    const token = getTokenFromHeaders(req.headers)
    await validateAuth({ token, desiredLevels })
    next()
  } catch (err) {
    err.message = `Invalid token!: ${err.message}`
    next(err)
  }
}

export async function authAnonymous(req, res, next) {
  validateApiKey(req.headers)
  next()
}

export async function authLogged(req, res, next) {
  await auth(req, next, [ AUTH_LEVEL.LOGGED ])
}

export async function authSubscription(req, res, next) {
  await auth(req, next, [ AUTH_LEVEL.LOGGED, AUTH_LEVEL.SUBSCRIPTION ])
}
