import { AUTH_LEVEL } from '../../constants/index'
import { BadRequestError } from '../../errors/badRequestError'
import { ForbiddenAccessError } from '../../errors/forbiddenAccessError'
import { createToken, verifyToken } from './token'

const { API_KEY, JWT_REFRESH_DURATION = 43800 } = process.env

function validateApiKey(apiKey) {
  if (apiKey !== API_KEY) throw new BadRequestError('Chave de API inválida')
}

export function createAnonymousToken({ apiKey }) {
  validateApiKey(apiKey)
  const tokenData = { level: AUTH_LEVEL.ANONYMOUS }
  return createToken(tokenData)
}

export function safeCreateAnonymousToken() {
  return createToken({ level: AUTH_LEVEL.ANONYMOUS })
}

export function createLoggedToken(email) {
  const tokenData = { email, level: AUTH_LEVEL.LOGGED }
  const loggedToken = createToken(tokenData)
  const refreshToken = createToken(tokenData, JWT_REFRESH_DURATION)
  return { loggedToken, refreshToken }
}

export async function validateToken({ token, desiredLevel }) {
  if (!token || !desiredLevel) throw new ForbiddenAccessError('Token de autenticação inválido')

  const tokenData = await verifyToken({ token })
  if (tokenData.level !== desiredLevel)
    throw new ForbiddenAccessError('Nível de autenticação insuficiente')
}

export async function refreshLoggedToken({ refreshToken }) {
  const refreshTokenData = await verifyToken({ token: refreshToken })

  if (refreshTokenData.level !== AUTH_LEVEL.LOGGED)
    throw new ForbiddenAccessError('Nível de autenticação insuficiente')

  return createLoggedToken(refreshTokenData.email)
}

export function getTokenFromHeaders(headers) {
  const tokenHeaders = headers.authorization || ''
  return tokenHeaders.replace('Bearer ', '')
}
