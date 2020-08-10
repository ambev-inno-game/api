import { AUTH_LEVEL } from '../../constants/index'
import { BadRequestError } from '../../errors/badRequestError'
import { findUserByEmail } from '../../repository/user/user'
import { findByUserId } from '../../repository/subscriber/subscriber'
import { safeCreateAuth } from '../general/auth'
import { encryptText } from '../general/encrypt'

const INVALID_LOGIN_MESSAGE = 'Oops... Informações inválidas'

function validateLoginData(email, password) {
  if (!email || !password) throw new BadRequestError(INVALID_LOGIN_MESSAGE)
}

function getTokenObject(user, subscriber) {
  return { name: user.name, email: user.email, subscriberId: subscriber.id, level: AUTH_LEVEL.LOGGED }
}

export async function login({ email, password }) {
  validateLoginData(email, password)
  const encryptedPassword = encryptText(password)
  const user = await findUserByEmail(email)
  const subscriber = (user && user.id) && await findByUserId(user.id) || {}

  if (!user || user.password !== encryptedPassword) throw new BadRequestError(INVALID_LOGIN_MESSAGE)

  return { ...user.toDto(), ...safeCreateAuth(getTokenObject(user, subscriber)) }
}

export async function refreshLogin({ email }) {
  const user = await findUserByEmail(email)
  const subscriber = await findByUserId(user.id)
  return { ...user.toDto(), ...safeCreateAuth(getTokenObject(user, subscriber)) }
}
