import { executeQuery, executeParametrizedQuery } from '../db'
import { UserModel } from './userModel'
import { findByUserId } from '../subscriber/subscriber'

export async function findAllUsers() {
  const query = 'SELECT * FROM ambev_user'
  const response = await executeQuery(query)
  return response.rows.map(row => new UserModel(row))
}

export async function findUser(id) {
  const query = 'SELECT * FROM ambev_user WHERE id = $1'
  const params = [id]
  const response = await executeParametrizedQuery(query, params)
  return new UserModel(response.rows[0])
}

export async function findUserByEmail(email) {
  const query = 'SELECT * FROM ambev_user WHERE email = $1'
  const params = [email]
  const response = await executeParametrizedQuery(query, params)
  return new UserModel(response.rows[0])
}