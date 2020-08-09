import { findAllUsers, findUser } from '../../repository/user/user'

export async function getAllUsers() {
  const result = await findAllUsers()
  return result.map(user => user.toDto())
}

export async function getUser({ id }) {
  const result = await findUser(id)
  return result.map(user => user.toDto())
}
