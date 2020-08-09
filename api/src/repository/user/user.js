import { executeQuery, executeParametrizedQuery } from '../db'
import { UserModel } from './userModel'

export async function findAllUsers() {
  const query = 'SELECT * FROM as_user'
  const response = await executeQuery(query)
  return response.rows.map(row => new UserModel(row))
}

export async function findUser(id) {
  const query = 'SELECT * FROM as_user WHERE id = $1'
  const params = [id]
  const response = await executeParametrizedQuery(query, params)
  return response.rows.map(row => new UserModel(row))
}

export async function findUserByEmail(email) {
  const query = 'SELECT * FROM as_user WHERE email = $1'
  const params = [email]
  const response = await executeParametrizedQuery(query, params)
  return response.rows.map(row => new UserModel(row))
}
