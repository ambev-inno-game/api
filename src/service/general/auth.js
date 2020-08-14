import { AUTH_LEVEL } from '../../constants/index'
import { BadRequestError } from '../../errors/badRequestError'
import { ForbiddenAccessError } from '../../errors/forbiddenAccessError'
import { createToken, verifyToken } from './token'
import { refreshLogin } from '../domain/login'
import { refreshSubscription } from '../domain/subscriber'

const { API_KEY, JWT_REFRESH_DURATION = "30d" } = process.env

export function validateApiKey({ apiKey }) {
  if (apiKey !== API_KEY) throw new BadRequestError('Chave de API inválida')
}

export function safeCreateAuth(options) {
  const token = createToken(options)
  const refreshToken = createToken(options, JWT_REFRESH_DURATION)
  return { token, refreshToken }
}

export function createAuth({ apiKey, options }) {
  validateApiKey({ apiKey })
  return safeCreateAuth(options)
}

export async function validateAuth({ token, desiredLevels }) {
  if (!token) throw new ForbiddenAccessError('Token de autenticação inválido')

  const tokenData = await verifyToken({ token })
  if (!desiredLevels.includes(tokenData.level))
    throw new ForbiddenAccessError('Nível de autenticação insuficiente')
}

export async function refreshToken({ refreshToken }) {
  const tokenData = await verifyToken({ token: refreshToken })

  switch (tokenData.level) {
    case AUTH_LEVEL.LOGGED:
      return refreshLogin(tokenData)
    case AUTH_LEVEL.SUBSCRIPTION:
      return refreshSubscription(tokenData)
    default:
      throw new ForbiddenAccessError('Nível de autenticação insuficiente')
  } 
}

export function getTokenFromHeaders(headers) {
  const tokenHeaders = headers.authorization || ''
  return tokenHeaders.replace('Bearer ', '')
}
