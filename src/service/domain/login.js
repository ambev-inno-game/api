import { BadRequestError } from '../../errors/badRequestError'
// import { findUserByEmail } from '../../repository/user/user'
import { createLoggedToken } from '../general/auth'
import { encryptText } from '../general/encrypt'

const INVALID_LOGIN_MESSAGE = 'Oops... Informações inválidas'

function validateLoginData(email, password) {
  if (!email || !password) throw new BadRequestError(INVALID_LOGIN_MESSAGE)
}

export async function login({ email, password }) {
  validateLoginData(email, password)
  const encryptedPassword = encryptText(password)
  // const [user] = await findUserByEmail(email)
  const [user] = null

  if (!user || user.password !== encryptedPassword) throw new BadRequestError(INVALID_LOGIN_MESSAGE)

  return { ...user.toDto(), token: createLoggedToken(email) }
}
