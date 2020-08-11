import { executeQuery } from '../db'
import { CategoryModel } from './categoryModel'

export async function loadAll() {
  const query = `SELECT * FROM ambev_category`
  const response = await executeQuery(query)
  return response.rows.map(row => CategoryModel.fromDb(row))
}