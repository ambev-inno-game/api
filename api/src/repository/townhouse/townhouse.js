import { executeQuery, executeParametrizedQuery } from '../db'
import { TownhouseModel } from './townhouseModel'

export async function save(townhouse) {
  const query = `INSERT INTO as_townhouse (name, contract_expiration_date) VALUES ($1, $2)`
  const params = [townhouse.name, townhouse.contractExpirationDate]
  await executeParametrizedQuery(query, params)
}

export async function update(townhouse) {
  const query = `UPDATE as_townhouse SET name = $1, contract_expiration_date = $2, updated_at = NOW() WHERE id = $3`
  const params = [townhouse.name, townhouse.contractExpirationDate, townhouse.id]
  await executeParametrizedQuery(query, params)
}

export async function remove(id) {
  const query = `DELETE FROM as_townhouse WHERE id = $1`
  const params = [id]
  const results = await executeParametrizedQuery(query, params)
  return results.rowCount
}

export async function findAll() {
  const query = `SELECT * FROM as_townhouse`
  const response = await executeQuery(query)
  return response.rows.map(row => TownhouseModel.fromDb(row))
}

export async function findTownhouse(id) {
  const query = 'SELECT * FROM as_townhouse WHERE id = $1'
  const params = [id]
  const response = await executeParametrizedQuery(query, params)
  return response.rows.map(row => TownhouseModel.fromDb(row))
}
